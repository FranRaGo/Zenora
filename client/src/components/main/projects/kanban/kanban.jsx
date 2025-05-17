import React, { useState, useEffect } from "react";
import { getActiveSpace } from "../../../../utils/getActiveSpace";
import FromProject from "../forms/FormProject";

const Kanban = () => {
    const [space, setSpace] = useState(null);
    const [moduls, setModuls] = useState(null);
    const [projects, setProjects] = useState([]);
    const [formProject, setFormProject] = useState(false);
    const [usersSpace, setUsersSpace] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        };
        loadSpace();
    }, []);

    useEffect(() => {
        const getModulSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`http://localhost:3000/api/modules/${space.id}`);
                if (res.ok) {
                    const data = await res.json();
                    const mod = data.find(m => m.id === 1);
                    if (mod) setModuls(mod);
                }
            } catch (err) {
                console.error("Error al obtener módulos", err);
            }
        };
        getModulSpace();
    }, [space]);

    useEffect(() => {
        const getProjects = async () => {
            if (!moduls) return;
            try {
                const res = await fetch(`http://localhost:3000/api/projects/${moduls.modSpaceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error("Error al obtener proyectos", err);
            }
        };
        getProjects();
    }, [moduls]);

    useEffect(() => {
        const loadUserSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`http://localhost:3000/api/usersSpace/${space.id}`);
                if (res.ok) {
                    const resData = await res.json();
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
            {formProject && <FromProject onClose={() => setFormProject(false)} usersSpace={usersSpace} />}
            <div className="container-projects-list">
                {projects.length > 0 ? (
                    <div>
                        <h2 style={{ color: 'white' }}>Kanban view in progress...</h2>
                        {/* Aquí podrías mapear los proyectos y mostrar columnas tipo Kanban */}
                    </div>
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
        </>
    );
};

export default Kanban;