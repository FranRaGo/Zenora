import React, { useState, useEffect, useRef } from "react";
import { getActiveSpace } from "../../../../utils/getActiveSpace";
import { DragDropContext } from "react-beautiful-dnd";

import TaskColumn from "./TaskColumn";
import Notification from "../../../global/notifications";
import Profile from "../../../global/profile/profile";
import FromProject from "../forms/FormProject";

import OptionsProject from "./OptionsProject";
import AssignProject from "./AssignProject";

const List = ({ user, space, modul, projectData, setProjectData, usersSpace, getProjects }) => {
    const [formProject, setFormProject] = useState(false);
    const [openOptionsProject, setOpenOptionsProject] = useState(false);
    const [openAssignProject, setOpenAssignProject] = useState(false);

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

    const changeDropdown = (projectId) => {
        setDropdowns((prev) => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    return (
        <>
            {formProject && <FromProject onClose={() => setFormProject(false)} usersSpace={usersSpace} modul={modul} onReload={getProjects} />}
            <DragDropContext onDragEnd={manejarDrop}>
                <div className="container-projects-list">
                    {projectData && projectData.length > 0 ? (
                        projectData.map((pr, index) => (
                            <div key={pr.id} className="projects-list">
                                <div className="header-project">
                                    <button className="btn-open-see" onClick={() => {
                                        const updated = [...projectData];
                                        updated[index].isOpen = !updated[index].isOpen;
                                        setProjectData(updated);
                                    }}>
                                        {pr.isOpen ? (
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

                                    </div>

                                    <div className="btn-assign-project" onClick={() => setOpenAssignProject(!openAssignProject)}>
                                        {pr.users && pr.users.length > 0 ? (
                                            <div className="assigned-users">
                                                {pr.users.slice(0, 3).map((user) => (
                                                    <Profile key={user.id} userId={user.id} styleCss="profile-stack" />
                                                ))}
                                                {pr.users.length > 3 && (
                                                    <div className="profile_project extra-count">+{pr.users.length - 3}</div>
                                                )}
                                            </div>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                            </svg>
                                        )}

                                        {openAssignProject && <AssignProject
                                            project={pr}
                                            usersAssignedInit={pr.users}
                                            usersSpace={usersSpace}
                                            getProjects={getProjects}
                                            onClose={() => setOpenAssignProject(false)}
                                        />}
                                    </div>

                                    <div id="option-project" className="transparent" onClick={() => setOpenOptionsProject(true)}>
                                        <svg className="svg-option-project" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                        {openOptionsProject && <OptionsProject
                                            project={pr}
                                            getProjects={getProjects}
                                            onClose={() => setOpenOptionsProject(false)}
                                        />}
                                    </div>

                                </div>

                                {pr.isOpen && (
                                    <>
                                        <TaskColumn status={0} project={pr} users={pr.users} />
                                        <TaskColumn status={1} project={pr} users={pr.users} />
                                        <TaskColumn status={2} project={pr} users={pr.users} />
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