import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormTask = ({ projects, project, status, users, onClose }) => {
    const [projectSelected, setProjectSelected] = useState(project || null);
    const [openChangeProject, setOpenChangeProject] = useState(null);

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null);

    // http://localhost:3000/api/projectsByUser/${modSpaceId}/${user.id}/${user.role}

    //dropdown status
    const [statusSelected, setStatusSelected] = useState(null);
    const [openStatus, setOpenStatus] = useState(null);
    const statusLabels = {
        0: "Pending",
        1: "In-progress",
        2: "Done"
    };

    //dropdown Assign
    const [assignSelected, setAssignSelected] = useState(null);
    const [openAssign, setOpenAssign] = useState(null);

    //dropdown Date
    const [selectedDate, setSelectedDate] = useState(null);

    //Priority
    const [prioritySelected, setPrioritySelected] = useState(null);
    const [openPriority, setOpenPriority] = useState(null);

    //Ref
    const ref = useRef();
    useClickOutside(ref, onClose);

    const createTasks = async () => {
        const taskData = {
            title: title,
            description: desc,
            status: statusSelected,
            priority: prioritySelected || 0,
            due_date: selectedDate ? selectedDate.toISOString().split("T")[0] : null 
        };

        try {
            const res = await fetch(`http://localhost:3000/api/task/${projectSelected.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error("❌ Error al crear tarea:", errorText);
                return;
            }

            const data = await res.json(); // 👈 directe, segur i fiable
            const taskId = data.taskId;

            if (!taskId) {
                console.error("❌ taskId no recibido del backend");
                onClose();
                return;
            }

            const assignRes = await fetch(`http://localhost:3000/api/assigTask/${taskId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    assigId: users[0].id_assign
                })
            });

            if (!assignRes.ok) {
                const errorText = await res.text();
                console.error("❌ Error al assignar tarea:", errorText);
                return;
            }

            onClose();
        } catch (err) {
            console.error("Error al crear una tarea", err);
        }
    };




    return (
        <div className="formPopUp form-task" ref={ref}>
            <div className="header-fromPopUp">
                <h2>Create Task</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div onClick={() => setOpenChangeProject(!openChangeProject)} className="select-project-box">
                {projectSelected ? (
                    <p className="project-selected">{projectSelected.title}</p>
                ) : (
                    <p>Choose one project...</p>
                )}

                {openChangeProject && (
                    <div className="project-list">
                        {projects?.length > 0 ? (
                            projects.map((pr) => (
                                <div key={pr.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProjectSelected(pr);
                                        setOpenChangeProject(false);
                                    }}
                                    className="project-item"
                                >
                                    {pr.title}
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">No projects available</p>
                        )}
                    </div>
                )}
            </div>


            <label htmlFor="title" className="sr-only">Tasks name</label>
            <input type="text" name="title" id="title" placeholder="Name of the tasks" onChange={(e) => setTitle(e.target.value)} />

            <ExpandableInput value={desc} onChange={setDesc} />

            <div className="options">
                <div>
                    <button className="btn-clean dropdown-status-button" onClick={() => setOpenStatus(!openStatus)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p>{statusLabels[statusSelected] || ""}</p>
                    </button>
                    {openStatus && (
                        <div className="dropdown-status-options">
                            {Object.entries(statusLabels).map(([key, label]) => (
                                <div
                                    key={key}
                                    className={`dropdown-status-option ${parseInt(key) === statusSelected ? "selected" : ""}`}
                                    onClick={() => {
                                        setStatusSelected(parseInt(key));
                                        setOpenStatus(false);
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <button className="btn-clean">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </button>

                </div>

                <div className={selectedDate ? "input-with-duedate date-wrapper" : "input-without-duedate date-wrapper"}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        customInput={
                            <div className="date-custom-container">
                                <button className="date-button-custom">
                                    {selectedDate ? (
                                        <div className="selected-date-display">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                            {selectedDate.toLocaleDateString("es-ES")}
                                        </div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    )}
                                </button>
                                {selectedDate && (
                                    <button
                                        className="btn-clear-banner"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDate(null);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        }
                    />
                </div>

                <button className="btn-clean">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>

                </button>
            </div>
            <button onClick={createTasks}>Create Tasks</button>
        </div>
    )
}

export default FormTask;