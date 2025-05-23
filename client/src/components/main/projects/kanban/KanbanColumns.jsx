import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import TaskItemKanban from "./TaskItemKanban";
import FormTask from "../forms/FormTask";
import TaskInfo from "../task/TaskInfo";

const apiURL = import.meta.env.VITE_API_URL;

const KanbanColumns = ({ status, project, users, user }) => {
    const [fromTask, setFromTask] = useState(false);
    const [taskToView, setTaskToView] = useState(null);

    const [tareas, setTareas] = useState([]);
    const tareasFiltradas = tareas?.filter(t => t.status === status);

    const titles = {
        0: "Pending",
        1: "In-progress",
        2: "Done"
    };

    useEffect(() => {
        if (!project) return;
        const loadTasks = async () => {
            const res = await fetch(`${apiURL}/api/projectTask/${project.id}`);
            if (res.ok) {
                const data = await res.json();
                console.log("projectska", data);
                setTareas(data);
            }
        };
        loadTasks();
    }, [project]);

    return (
        <>
            {taskToView && <TaskInfo tarea={taskToView} onClose={() => setTaskToView(null)} />}
            {fromTask && <FormTask projects={null} project={project} status={status} users={users} onClose={() => setFromTask(false)} />}
            <Droppable droppableId={`${project.id}-${status}`}>
                {(provided) => (
                    <div className={`kanban-column-${status}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <p className="">{titles[status]}</p>
                        {tareasFiltradas.map((tarea, index) => (
                            <Draggable key={tarea.id} draggableId={tarea.id.toString()} index={index}>
                                {(provided) => {
                                    console.log("renderizando tarea", tarea.id);
                                    return (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <TaskItemKanban tarea={tarea} />
                                        </div>
                                    );
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </>
    )
}

export default KanbanColumns;