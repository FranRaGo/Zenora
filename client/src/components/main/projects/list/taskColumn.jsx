import React, { useMemo, useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./item/TaskItem";
import FormTask from "../forms/FormTask";
import SelectionBar from "./SelectionBar";
import TaskInfo from '../task/TaskInfo';


const TaskColumn = ({ status, project, users, user, selectedTasks, setSelectedTasks, getProjects }) => {
    const [tareas, setTareas] = useState([]);
    const [dropdown, setDropdown] = useState(true);
    const [fromTask, setFromTask] = useState(false);
    const [taskToView, setTaskToView] = useState(null);
    const changeViewDetails = () => {
        if (selectedData.length === 1) {
            setTaskToView(selectedData[0]);        
            setSelectedTasks([]);                 
        }
    };

    const [usuarioComplet, setUsuarioComplet] = useState(null);

    useEffect(() => {
        if (user && users?.length > 0) {
            const usuarioConPermisos = users.find(us => us.id === user.id);
            if (usuarioConPermisos) {
                setUsuarioComplet({ ...user, ...usuarioConPermisos });
            }
        }
    }, [user, users]);

    const selectedData = useMemo(() => {
        return selectedTasks;
    }, [selectedTasks]);

    const tareasFiltradas = tareas?.filter(t => t.status === status);
    const titles = {
        0: "Pending",
        1: "In-progress",
        2: "Done"
    };

    useEffect(() => {
        if (!project) return;
        const loadTasks = async () => {
            const res = await fetch(`http://localhost:3000/api/projectTask/${project.id}`);
            if (res.ok) {
                const data = await res.json();
                setTareas(data);
            }
        };
        loadTasks();
    }, [project]);

    return (
        <>
            {taskToView && <TaskInfo tarea={taskToView} onClose={() => setTaskToView(null)}  />}
            {fromTask && <FormTask projects={null} project={project} status={status} users={users} onClose={() => setFromTask(false)} />}
            <Droppable droppableId={`${project.id}-${status}`}>
                {(provided) => (
                    <div className="div-status" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="status-header">
                            {dropdown ? (
                                <svg onClick={() => setDropdown(!dropdown)} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            ) : (
                                <svg onClick={() => setDropdown(!dropdown)} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            )}
                            <p className={`name-status-${status}`}>{titles[status]}</p>
                            <p className="num-tasks">{tareasFiltradas.length}</p>
                        </div>

                        {dropdown && (
                            <>
                                <div className="header-table">
                                    <p>Title</p>
                                    <p>Assignee</p>
                                    <p>Due Date</p>
                                    <p>Priority</p>
                                </div>

                                <div className="task-list">
                                    {tareasFiltradas.map((tarea, index) => {
                                        const isSelected = selectedTasks.includes(tarea.id);

                                        return (
                                            <Draggable key={tarea.id} draggableId={tarea.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div className={` ${isSelected ? 'task-item-selected' : 'tasks-item'}`} ref={provided.innerRef} {...provided.draggableProps}>
                                                        <div className={`task-drag-select ${isSelected ? 'taskSelected' : 'taskNoSelected'}`}>
                                                            <div id="gripDots" {...provided.dragHandleProps}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                                                    <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                                                                </svg>
                                                            </div>
                                                            <input type="checkbox" id={`checkbox-tasks-${tarea.id}`} checked={isSelected}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedTasks((prev) => [...prev, tarea.id]);
                                                                    } else {
                                                                        setSelectedTasks((prev) => prev.filter((id) => id !== tarea.id));
                                                                    }
                                                                }} />
                                                        </div>
                                                        <TaskItem tarea={tarea} disableDraggable project={project} users={users} isSelected={isSelected} onOpenTask={() => setTaskToView(tarea)}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                                {(usuarioComplet?.manager === 1 || usuarioComplet?.owner === 1 || usuarioComplet?.role === "member") && (
                                    <button id="add-new-task" onClick={() => setFromTask(true)}>+ Añadir tareas</button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </Droppable>
            {selectedTasks.length > 0 && (
                <SelectionBar selected={selectedData} onClear={() => setSelectedTasks([])} onView={changeViewDetails} getProjects={getProjects}/>
            )}
        </>
    );
};

export default TaskColumn;
