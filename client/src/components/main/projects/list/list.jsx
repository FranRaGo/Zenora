import React, { useState, useEffect } from "react";
import { getActiveSpace } from "../../../../utils/getActiveSpace";
import { DragDropContext } from "react-beautiful-dnd";

import TaskColumn from "./taskColumn";
import Notification from "../../../global/notifications";

const List = () => {
    const [space, setSpace] = useState(null);
    const [moduls, setModuls] = useState(null);
    const [projects, setProjects] = useState([]);
    const [dropdowns, setDropdowns] = useState({});
    const [reloadProyectos, setReloadProyectos] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        }
        loadSpace();
    }, []);

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
                            setModuls(data[i]);
                            console.log("El modulo agregado", data[i]);
                        }
                    }
                    setModuls(data);
                    console.log(JSON.stringify(data));
                }
            } catch (err) {
                console.error("Error en el get modulos", err);
            }
        }
        getModulSpace();
    }, [space]);

    useEffect(() => {
        const getProjects = async () => {
            if (!moduls || moduls.length === 0) return;
            try {
                const res = await fetch(`http://localhost:3000/api/projects/${moduls[0].modSpaceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
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
    }, [moduls, reloadProyectos]);

    const manejarDrop = async (result) => {
        console.log(result);
        const { source, destination, draggableId } = result;

        // Si no hay destino (por ejemplo, se soltó fuera de una columna válida), salimos
        if (!destination) return;

        // Si se soltó en el mismo sitio donde estaba, no hacemos nada
        if (source.droppableId === destination.droppableId) return;

        console.log("🔽 Resultado del drop:");
        console.log("👉 ID de la tarea:", draggableId);
        console.log("👉 Desde:", source.droppableId);
        console.log("👉 Hacia:", destination.droppableId);

        // Extraer el ID del proyecto del droppable destino: formato esperado "4-1"
        const [proyectoDestinoId, estadoDestino] = destination.droppableId.split("-");
        const [proyectoOrigenId, estadoOrigen] = source.droppableId.split("-");

        // Validar si se está intentando mover a otro proyecto (NO permitido)
        if (proyectoOrigenId !== proyectoDestinoId) {
            console.error("❌ No puedes mover tareas entre proyectos diferentes.");
            // showNotification("No puedes mover tareas a otro proyecto", "error");
            return;
        }


        // Si es válido, simulamos el cambio de estado
        console.log(`✅ Cambiar estado de tarea ${draggableId} a ${estadoDestino} en proyecto ${proyectoDestinoId}`);
        try{
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
            
        }catch(err){
            console.error("error al coger los datos de la tarea", err);
        }

        

        //         --Actualizar una tarea.
// http://localhost:3000/api/task/:taskId
// { *title, *description, due_date, status, priority }
        // Aquí iría la lógica para actualizar el estado en la base de datos o en el frontend
    };

    const changeDropdown = (projectId) => {
        setDropdowns((prev) => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };


    return (
        <DragDropContext onDragEnd={manejarDrop}>
            <div className="container-projects-list">
                {projects && projects.map((pr) => (
                    <div key={pr.id} className="projects-list">
                        <div className="header-project">
                            <button onClick={() => changeDropdown(pr.id)}>
                                {dropdowns[pr.id] ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                )}
                            </button>

                            <p>{pr.title}</p>
                        </div>
                        {dropdowns[pr.id] && (
                            <>
                                <TaskColumn status={0} project={pr} />
                                <TaskColumn status={1} project={pr} />
                                <TaskColumn status={2} project={pr} />
                            </>
                        )}

                    </div>
                ))}
            </div>
        </DragDropContext>

    );
}

export default List;