import React, { useRef } from "react";
import Profile from "../../../../global/profile/profile";
import useClickOutside from "../../../../../utils/useClickOutside";


const AssingDropdown = ({ tarea, users, userAssigned, reloadAssigned, setUserAssigned, onClose }) => {
    const ref = useRef();
    useClickOutside(ref, onClose);

    const assignUser = async (user) => {
        console.log("Add user a la task", user);
        try {
            const res = await fetch(`http://localhost:3000/api/assigTask/${tarea.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assigId: user.id_assign }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log("✅ Respuesta JSON:", data);
                reloadAssigned();
            } else {
                const error = await res.text();
                console.error("❌ Error del backend:", error);
            }
        } catch (err) {
            console.log("Error a la hora de assignar un usuario a la tarea", err);
        }
    }

    const removeUser = async (user) => {
        console.log("Delete user a la task", user);
        try {
            const res = await fetch(`http://localhost:3000/api/assigTask/${user.id_assign_task}`, {
                method: "DELETE",
            });
            if (res.ok) {
                const data = await res.json();
                console.log("✅ Respuesta JSON:", data);
                reloadAssigned();
            } else {
                const error = await res.text();
                console.error("❌ Error del backend:", error);
            }
        } catch (err) {
            console.log("Error to delete assignacion de un usuario en la tarea", err);
        }
    }


    return (
        <div className="dropdown-status-options" ref={ref}>
            <p>Selected</p>
            {userAssigned.map((user) => (
                <div key={user.id} className="user-entry">
                    <div className="user-info">
                        <Profile userId={user.id} styleCss="profile_project" />
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className="user-actions">
                        <button id="remove-assign-project" onClick={() => removeUser(user)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}

            <p>Not selected</p>
            {users.filter(u => !userAssigned.some(a => a.id === u.id)).map(user => (
                <div key={user.id} className="user-entry" onClick={() => assignUser(user)}>
                    <div className="user-info">
                        <Profile userId={user.id} styleCss="profile_project" />
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AssingDropdown;