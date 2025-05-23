import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "../../../global/profile/profile";

const FormTask = ({ projects, project, status, users, onClose }) => {
    const [projectSelected, setProjectSelected] = useState(project || null);
    const [openChangeProject, setOpenChangeProject] = useState(null);
    const statusRef = useRef();
    const assignRef = useRef();
    const priorityRef = useRef();
    const [projectUsers, setProjectUsers] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (statusRef.current && !statusRef.current.contains(e.target)) {
                setOpenStatus(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignRef.current && !assignRef.current.contains(e.target)) {
                setOpenAssign(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (priorityRef.current && !priorityRef.current.contains(e.target)) {
                setOpenPriority(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const divProjectSelectedRef = useRef(null);
    useEffect(() => {
        if (projectSelected && divProjectSelectedRef.current) {
            divProjectSelectedRef.current.classList.remove("inputErrorSelect");
        }
    }, [projectSelected]);

    const [errors, setErrors] = useState({
        project: false,
        title: false,
        desc: false,
        status: false
    });


    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState("");


    //dropdown status
    const [statusSelected, setStatusSelected] = useState(status || null);
    const [openStatus, setOpenStatus] = useState(null);
    const statusOptions = [
        { value: 0, label: "Pending" },
        { value: 1, label: "In-progress" },
        { value: 2, label: "Done" }
    ];

    //dropdown Assign
    const [assignSelected, setAssignSelected] = useState([]);
    const [openAssign, setOpenAssign] = useState(null);

    const assignUser = (newUser) => {
        if (assignSelected.find((u) => u.id === newUser.id)) return;
        setAssignSelected((prev) => [...prev, newUser]);
    };

    const removeUser = (userId) => {
        setAssignSelected((prev) => prev.filter((u) => u.id !== userId));
    };

    //dropdown Date
    const [selectedDate, setSelectedDate] = useState(null);

    //Priority
    const [prioritySelected, setPrioritySelected] = useState(null);
    const [openPriority, setOpenPriority] = useState(null);
    const priorityOptions = [
        { value: 1, label: "Low" },
        { value: 2, label: "Normal" },
        { value: 3, label: "Medium" },
        { value: 4, label: "High" },
        { value: 0, label: "Delete" }
    ];

    const color = {
        1: "#606060",
        2: "#3e63dd",
        3: "#ffc53e",
        4: "#e63237",
        0: "#9f9f9f"
    };

    //Ref
    const ref = useRef();
    useClickOutside(ref, onClose);

    const createTasks = async () => {
        const newErrors = {
            project: !projectSelected,
            title: !title || title.trim() === "",
            desc: !desc || desc.trim() === "",
            status: statusSelected === null
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(val => val)) return;

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

            console.log("📨 Respuesta creación tarea:", res.status);
            const data = await res.json();
            console.log("✅ Respuesta JSON:", data);

            const taskId = data.taskId;

            if (!taskId) {
                console.error("❌ taskId no recibido del backend");
                onClose();
                return;
            }

            console.log("👥 Asignando usuarios:");
            assignSelected.forEach(user => {
                console.log("➡️", user.id, user.first_name, user.last_name, user.id_assign);
            });

            if (!assignSelected || assignSelected.length === 0) {
                console.warn("⚠️ No hay usuario para asignar. Se creará sin asignación.");
                onClose(); // cerrar igualmente
                return;
            }

            for (const user of assignSelected) {
                const assignRes = await fetch(`http://localhost:3000/api/assigTask/${taskId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        assigId: user.id_assign
                    })
                });
                if (!assignRes.ok) {
                    const errorText = await assignRes.text();
                    console.error(`❌ Error al asignar usuario ${user.id}:`, errorText);
                }
            }

            console.log("Cerrando formulario");
            onClose();
            navigate(0);
        } catch (err) {
            console.error("Error al crear una tarea", err);
        } finally {
            onClose();
            navigate(0);
        }
    };

    const selectedStatus = statusOptions.find(opt => opt.value === statusSelected);

    useEffect(() => {
        const loadUsersProjectSelected = async () => {
            if (!projectSelected) return;
            try {
                const res = await fetch(`http://localhost:3000/api/projectUsers/${projectSelected.id}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log("Usuarios de ese proyecto", data);
                    setProjectUsers(data);
                }
            } catch (err) {
                console.error("Error al recoger los usuarios", err);
            }
        }
        loadUsersProjectSelected();
    }, [projectSelected]);

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
            <div onClick={() => setOpenChangeProject(!openChangeProject)} id="inputSelectProject" className="select-project-box" tabIndex="0" ref={divProjectSelectedRef}>
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
            <input type="text" name="title" id="title" placeholder="Name of the tasks"
                onChange={(e) => {
                    setTitle(e.target.value)
                    setErrors(prev => ({ ...prev, title: false }));
                }}
                className={errors.title ? "inputErrorSelect" : ""}
            />

            <ExpandableInput value={desc} onChange={setDesc} />

            <div className="options">
                <div className={`div-status-taks ${errors.status ? "inputErrorSelect" : ""}`} ref={statusRef}>
                    <button className="btn-clean btn-status-button"
                        onClick={() => {
                            if (!projectSelected) {
                                setErrors(prev => ({ ...prev, project: true }));
                                return;
                            }
                            if (!statusSelected) {
                                setErrors(prev => ({ ...prev, status: true }));
                            }
                            setOpenStatus(!openStatus);
                        }}
                    >
                        {statusSelected === null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        ) : (
                            <>
                                <p id={`circle-status-${selectedStatus?.value}`}></p>
                                <p>{selectedStatus?.label}</p>
                            </>
                        )}
                    </button>
                    {openStatus && (
                        <div className="dropdown-status-options">
                            {statusOptions.map(({ value, label }) => (
                                <div
                                    key={value}
                                    className={`dropdown-btn-status ${parseInt(value) === statusSelected ? "selected" : ""}`}
                                    onClick={() => {
                                        setStatusSelected(parseInt(value));
                                        setOpenStatus(false);
                                    }}
                                >
                                    <p id={`circle-status-${value}`}></p>
                                    <p>{label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="div-status-taks" ref={assignRef}>
                    <button className="btn-clean btn-assign-button" onClick={() => { if (!projectSelected) return; setOpenAssign(!openAssign) }}>
                        {assignSelected.length > 0 ? (
                            <div className="assigned-users">
                                {assignSelected.slice(0, 3).map((user) => (
                                    <Profile key={user.id} userId={user.id} styleCss="profile-stack" />
                                ))}
                                {assignSelected.length > 3 && (
                                    <div className="profile_project extra-count">+{assignSelected.length - 3}</div>
                                )}
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                        )}
                    </button>
                    {openAssign && (
                        <div className="dropdown-status-options">
                            <h4>Selected</h4>
                            {assignSelected.map((user) => (
                                <div key={user.id} className="user-entry">
                                    <div className="user-info">
                                        <Profile userId={user.id} styleCss="profile_project" />
                                        <p>{user.first_name} {user.last_name}</p>
                                    </div>
                                    <div className="user-actions">
                                        <button id="remove-assign-project" onClick={() => removeUser(user.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <h4>Not selected</h4>
                            {projectUsers.filter(u => !assignSelected.some(a => a.id === u.id)).map(user => (
                                <div key={user.id} className="user-entry" onClick={() => assignUser(user)}>
                                    <div className="user-info">
                                        <Profile userId={user.id} styleCss="profile_project" />
                                        <p>{user.first_name} {user.last_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={selectedDate ? "input-with-duedate date-wrapper" : "input-without-duedate date-wrapper"}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
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

                <div className="div-status-taks" ref={priorityRef}>
                    <button className="btn-clean priority-toggle" onClick={() => { if (!projectSelected) return; setOpenPriority(!openPriority) }}>
                        {prioritySelected !== null ? (
                            <div className="priority-display">
                                <svg xmlns="http://www.w3.org/2000/svg" fill={color[prioritySelected]} viewBox="0 0 24 24" strokeWidth="1" stroke={color[prioritySelected]} width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                </svg>
                                <span>{priorityOptions.find(opt => opt.value === prioritySelected)?.label}</span>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                            </svg>
                        )}
                    </button>
                    {openPriority && (
                        <div className="div-popup-priority">
                            {priorityOptions.map(({ value, label }) => (
                                <button
                                    key={value}
                                    className={`dropdown-item ${value === prioritySelected ? "selected" : ""}`}
                                    onClick={() => {
                                        setPrioritySelected(value);
                                        setOpenPriority(false);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={color[value]} viewBox="0 0 24 24" strokeWidth="1" stroke={color[value]} width="20" height="20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                    </svg>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button className="btn-create" onClick={createTasks}>Create Tasks</button>
        </div>
    )
}

export default FormTask;