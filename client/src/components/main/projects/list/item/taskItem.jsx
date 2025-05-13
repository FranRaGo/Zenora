import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Priority from "./priority";

const TaskItem = ({ tarea, index, disableDraggable = false }) => {
    const [assignedUsers, setAssignedUsers] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date(tarea.due_date));
    const [currentPriority, setCurrentPriority] = useState(tarea.priority);


    useEffect(() => {
        if (!tarea) return;
        const loadUsers = async () => {
            const res = await fetch(`http://localhost:3000/api/usersTask/${tarea.id}`);
            if (res.ok) {
                const data = await res.json();
                console.log("assigned users", data);
                setAssignedUsers(data);
            }
        };
        loadUsers();
    }, []);

    return (
        <div className="task-item-content">
            <div className="title-tasks">
                <p>{tarea.title}</p>
            </div>

            {assignedUsers && assignedUsers.length > 0 ? (
                <p>Los usuarios</p>
            ) : (
                <button className="btn-add-user">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3 m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11 a6.375 6.375 0 0 1 12.75 0v.109 A12.318 12.318 0 0 1 9.374 21 c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </button>
            )}
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy" className="date-picker-custom" />
            <Priority priority={currentPriority} taskId={tarea.id} setPriority={setCurrentPriority} />
        </div>
    );
};

export default TaskItem;
