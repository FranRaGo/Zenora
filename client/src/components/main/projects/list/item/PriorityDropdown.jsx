import React, { useState, useRef } from "react";
import useClickOutside from "../../../../../utils/useClickOutside";

const apiURL = import.meta.env.VITE_API_URL;

const PriorityDropdown = ({ priority, taskId, setPriority, onClose }) => {
    const ref = useRef();
    useClickOutside(ref, onClose);

    const changePriority = async (e) => {
        const selected = parseInt(e.currentTarget.id);

        try {
            const res = await fetch(`${apiURL}/api/task/${taskId}`);
            const data = await res.json();
            const tarea = data[0];

            const updatedTask = {
                title: tarea.title,
                description: tarea.description,
                due_date: tarea.due_date ? tarea.due_date.slice(0, 10) : null,
                status: tarea.status,
                priority: selected,
            };

            const updateRes = await fetch(`${apiURL}/api/task/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            if (!updateRes.ok) throw new Error("Error al actualizar prioridad");

            console.log("✅ Prioridad actualizada correctamente");
            setPriority(selected);
        } catch (err) {
            console.error("❌ Error al actualizar la prioridad:", err);
        }
    };

    return (
        <div className="div-popup-priority" ref={ref}>
            <button id="4" className={priority === 4 ? "selected" : ""} onClick={(e) => changePriority(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#e63237" viewBox="0 0 24 24" strokeWidth="1" stroke="#e63237">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <p>Hard</p>
            </button>
            <button id="3" className={priority === 3 ? "selected" : ""} onClick={(e) => changePriority(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffc53e" viewBox="0 0 24 24" strokeWidth="1" stroke="#ffc53e">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <p>Medium</p>
            </button>
            <button id="2" className={priority === 2 ? "selected" : ""} onClick={(e) => changePriority(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#3e63dd" viewBox="0 0 24 24" strokeWidth="1" stroke="#3e63dd">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <p>Normal</p>
            </button>
            <button id="1" className={priority === 1 ? "selected" : ""} onClick={(e) => changePriority(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#606060" viewBox="0 0 24 24" strokeWidth="1" stroke="#606060">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <p>Low</p>
            </button>
            <button id="0" className={priority === 0 ? "selected" : ""} onClick={(e) => changePriority(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#9f9f9f">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <p>Delete</p>
            </button>
        </div>

    );
}

export default PriorityDropdown;
