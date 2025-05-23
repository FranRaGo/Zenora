import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Priority from "./Priority";
import Profile from "../../../../global/profile/Profile";
import Assigne from "./Assigne";

const apiURL = import.meta.env.VITE_API_URL;

const TaskItem = ({ tarea, disableDraggable = false, users, isSelected, onOpenTask }) => {
    const [assignedUsers, setAssignedUsers] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        tarea?.due_date ? new Date(tarea.due_date) : null
    ); 
    const [currentPriority, setCurrentPriority] = useState(tarea.priority);
    const [assignUsersTask, setAssignUsersTask] = useState(false);


    useEffect(() => {
        if (!tarea) return;
        const loadUsers = async () => {
            const res = await fetch(`${apiURL}/api/usersTask/${tarea.id}`);
            if (res.ok) {
                const data = await res.json();
                console.log("assigned users", data);
                setAssignedUsers(data);
            }
        };
        loadUsers();
    }, []);

    const openAssignTasks = async () => {
        setAssignUsersTask(!assignUsersTask);
    }

    return (
        <div className={`task-item-content ${isSelected ? 'no-background' : ''}`}>
            <div className="title-tasks" onClick={onOpenTask}>
                <p>{tarea.title}</p>
            </div>
            <Assigne tarea={tarea} users={users} />
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()}
                customInput={
                    <button className="date-button-custom">
                        {selectedDate
                            ? selectedDate.toLocaleDateString("es-ES")
                            : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            )
                        }
                    </button>
                } />
            <Priority priority={currentPriority} taskId={tarea.id} setPriority={setCurrentPriority} />
        </div>
    );
};

export default TaskItem;
