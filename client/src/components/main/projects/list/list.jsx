import React, { useState, useEffect, useRef } from "react";
import { getActiveSpace } from "../../../../utils/getActiveSpace";
import { DragDropContext } from "react-beautiful-dnd";

import TaskColumn from "./TaskColumn";
import Notification from "../../../global/notifications";
import Profile from "../../../global/profile/profile";
import FromProject from "../forms/FormProject";

import OptionsProject from "./OptionsProject";
import AssignProject from "./AssignProject";

const List = () => {
    const [space, setSpace] = useState(null);
    const [modul, setModul] = useState(null);
    const [projects, setProjects] = useState([]);
    const [dropdowns, setDropdowns] = useState({});
    const [reloadProyectos, setReloadProyectos] = useState(null);
    const [projectUsers, setProjectUsers] = useState({});
    const [formProject, setFormProject] = useState(false);
    const [usersSpace, setUsersSpace] = useState(null);
    const [openOptionsProject, setOpenOptionsProject] = useState(false);
    const [openAssignProject, setOpenAssignProject] = useState(false);
    const [usersAssigned, setUsersAssigned] = useState([]);

    //get active space. recoge info del espacio actual
    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        }
        loadSpace();
    }, []);

    //coge el modulo del espacio, para saber si tiene el modulo de projects.
    useEffect(() => {
        const getModulSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`http://localhost:3000/api/modules/${space.id}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id === 1) {
                            setModul(data[i]);
                            console.log("El modulo agregado", data[i]);
                        }
                    }
                    setModul(data);
                    console.log(JSON.stringify(data));
                }
            } catch (err) {
                console.error("Error en el get modulos", err);
            }
        }
        getModulSpace();
    }, [space]);

    //
    useEffect(() => {
        const getProjects = async () => {
            if (!modul || modul.length === 0) return;
            try {
                const res = await fetch(`http://localhost:3000/api/projects/${modul[0].modSpaceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                    const usersPorProyecto = {};

                    for (const p of data) {
                        try {
                            const users = await searchUsers(p.id);
                            usersPorProyecto[p.id] = users;
                        } catch {
                            usersPorProyecto[p.id] = [];
                        }
                    }
                    setProjectUsers(usersPorProyecto);
                    const inicial = {};
                    data.forEach(p => {
                        inicial[p.id] = true;
                    });
                    setDropdowns(inicial);
                }
            } catch (err) {
                console.error("Error en el get modulos", err);
            }
        }
        getProjects();
    }, [modul, reloadProyectos]);

    const manejarDrop = async (result) => {
        console.log(result);
        const { source, destination, draggableId } = result;

        if (!destination) return;

        // Si se soltó en el mismo sitio donde estaba, no hacemos nada
        if (source.droppableId === destination.droppableId) return;

        // Extraer el ID del proyecto del droppable destino: formato esperado "4-1"
        const [proyectoDestinoId, estadoDestino] = destination.droppableId.split("-");
        const [proyectoOrigenId, estadoOrigen] = source.droppableId.split("-");

        // Validar si se está intentando mover a otro proyecto (NO permitido)
        if (proyectoOrigenId !== proyectoDestinoId) {
            console.error("❌ No puedes mover tareas entre proyectos diferentes.");
            // showNotification("No puedes mover tareas a otro proyecto", "error");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/api/task/${draggableId}`);
            if (!res.ok) throw new Error("No se pudo cargar la tarea");

            const resData = await res.json();
            const data = resData[0];
            console.log("tarea", data);

            const updateTarea = {
                title: data.title,
                description: data.description,
                due_date: data.due_date ? data.due_date.slice(0, 10) : null,
                status: parseInt(estadoDestino),
                priority: data.priority
            };

            console.log("new tarea", updateTarea);

            const updateRes = await fetch(`http://localhost:3000/api/task/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateTarea),
            });

            if (!updateRes.ok) throw new Error("Error al actualizar la tarea");
            console.log("✅ Tarea actualizada correctamente");
            setReloadProyectos(prev => !prev);
        } catch (err) {
            console.error("error al coger los datos de la tarea", err);
        }
    };

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

    const changeDropdown = (projectId) => {
        setDropdowns((prev) => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    useEffect(() => {
        const loadUserSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`http://localhost:3000/api/usersSpace/${space.id}`);
                if (res.ok) {
                    const resData = await res.json();
                    console.log("Usuarios del espacio", resData);
                    setUsersSpace(resData);
                }
            } catch (err) {
                console.error("Error al cargar usuarios del espacio", err);
            }
        }

        loadUserSpace();
    }, [space]);

    

    return (
        <>
            {formProject && <FromProject onClose={() => setFormProject(false)} usersSpace={usersSpace} modul={modul} />}
            <DragDropContext onDragEnd={manejarDrop}>
                <div className="container-projects-list">
                    {projects && projects.length > 0 ? (
                        projects.map((pr) => (
                            <div key={pr.id} className="projects-list">
                                <div className="header-project">
                                    <button onClick={() => changeDropdown(pr.id)}>
                                        {dropdowns[pr.id] ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        )}
                                    </button>

                                    <p>{pr.title}</p>
                                    <div className="assigned-users">
                                        {projectUsers[pr.id] && projectUsers[pr.id].length > 0 ? (
                                            <>
                                                {projectUsers[pr.id].map((persona) => (
                                                    <Profile key={persona.id} userId={persona.id} styleCss="profile_project" />
                                                ))}
                                            </>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                    <button id="btn-assignUser-project" onClick={() => setOpenAssignProject(!openAssignProject)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3 m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11 a6.375 6.375 0 0 1 12.75 0v.109 A12.318 12.318 0 0 1 9.374 21 c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                    </button>
                                    {openAssignProject && <AssignProject/>}
                                    
                                    <button id="option-project" onClick={() => setOpenOptionsProject(!openOptionsProject)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </button>
                                    {openOptionsProject && <OptionsProject/>}
                                </div>

                                {dropdowns[pr.id] && (
                                    <>
                                        <TaskColumn status={0} project={pr} users={projectUsers[pr.id] || []} />
                                        <TaskColumn status={1} project={pr} users={projectUsers[pr.id] || []} />
                                        <TaskColumn status={2} project={pr} users={projectUsers[pr.id] || []} />
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-projects">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>

                            <p className="empty-text">No projects yet</p>
                            <p className="empty-subtext">Projects help you organize and track your work easily.</p>
                            <button id="btn-add-project" onClick={() => setFormProject(true)}>Add project</button>
                        </div>
                    )}
                </div>
            </DragDropContext>
        </>
    );
}

export default List;