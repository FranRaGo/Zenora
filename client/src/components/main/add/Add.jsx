import React, { useState, useEffect, useRef, useCallback } from "react";
import '../../../styles/app.css';
import FromProject from "../projects/forms/FormProject";
import FormTask from "../projects/forms/FormTask";
import { getActiveUser } from "../../../utils/getActiveUser";

const Add = ({ user, onClose, usersSpace, modul }) => {
    const [formProject, setFormProject] = useState(false);
    const [formTask, setFormTask] = useState(false);

    const mainRef = useRef(); // ahora este envuelve todo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mainRef.current && !mainRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mainRef, onClose]);

    //cargar los proyectos del espacio y guardar la informacion de usuarios asignados y estado del dropdown
    const [projectData, setProjectData] = useState([]);
    console.log(projectData);

    const searchUsers = async (id) => {
        try {
            const users = await fetch(`http://localhost:3000/api/projectUsers/${id}`);
            if (!users.ok) throw new Error("Error searching users project", users.status);
            const usersData = await users.json();
            return usersData;
        } catch (err) {
            console.log("Error ", err);
        }
    }

    const getProjects = useCallback(async () => {
        if (!modul || !modul.modSpaceId || !user) return;

        try {
            const { modSpaceId } = modul;
            const res = await fetch(`http://localhost:3000/api/projectsByUser/${modSpaceId}/${user.id}/${user.role}`);
            if (!res.ok) throw new Error("No se pudieron obtener los proyectos");
            const data = await res.json();

            const result = [];
            for (const p of data) {
                let users = [];
                try {
                    users = await searchUsers(p.id);
                } catch {
                    users = [];
                }

                result.push({
                    ...p,
                    users,
                    isOpen: true,
                    showOptionsPopup: false,
                    showAssignPopup: false,
                });
            }

            setProjectData([]);
            setTimeout(() => setProjectData(result), 0);
        } catch (err) {
            console.error("Error en getProjects:", err);
        }
    }, [modul, user]);


    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        <>
            <div ref={mainRef}>
                {formProject && (<FromProject user={user} onClose={() => setFormProject(false)} usersSpace={usersSpace} modul={modul} />)}
                {formTask && (<FormTask projects={projectData} project={null} status={null} users={null} onClose={() => setFormTask(false)} />)}

                <div className="modal-backdrop">
                    <h2>Create</h2>
                    <div
                        className={`create-option ${user.role === "client" ? 'disabled' : ''}`}
                        onClick={() => user.role !== "client" && setFormProject(true)}
                        disabled={user.role === "client"}
                        style={{
                            cursor: user.role === "client" ? "not-allowed" : "pointer",
                            opacity: user.role === "client" ? 0.5 : 1,
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        <div className="create-labels">
                            <p>Projects</p>
                            <p className="description-text">Organize your project’s tasks and assign them to your team.</p>
                        </div>
                    </div>

                    <div
                        className={`create-option ${user.role === "client" ? 'disabled' : ''}`}
                        onClick={() => user.role !== "client" && setFormTask(true)}
                        disabled={user.role === "client"}
                        style={{
                            cursor: user.role === "client" ? "not-allowed" : "pointer",
                            opacity: user.role === "client" ? 0.5 : 1,
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                        </svg>
                        <div className="create-labels">
                            <p>Task</p>
                            <p className="description-text">Add tasks to your projects and assign them to your team.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
