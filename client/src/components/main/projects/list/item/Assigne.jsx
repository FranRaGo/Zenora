import React, { useState, useEffect } from "react";
import AssingDropdown from "./AssingDropdown";
import Profile from "../../../../global/profile/Profile";

const Assigne = ({ tarea, users }) => {
    const [assignDrop, setAssignDrop] = useState(false);
    const [userAssigned, setUserAssigned] = useState(null);


    const loadUsersAssigned = async () => {
        if (!tarea?.id) return;
        try {
            const res = await fetch(`http://localhost:3000/api/usersTask/${tarea.id}`);
            if (res.ok) {
                const resData = await res.json();
                setUserAssigned(resData);
            }
        } catch (err) {
            console.error("❌ Error cargando asignaciones:", err);
        }
    };

    useEffect(() => {
        let cancel = false;
        if (!cancel) loadUsersAssigned();
        return () => { cancel = true; };
    }, [tarea?.id]);

    return (
        <div className="btn-add-user" onClick={() => setAssignDrop(true)}>
            {userAssigned && userAssigned.length > 0 ? (
                <div className="assigned-users">
                    {userAssigned.slice(0, 3).map((user) => (
                        <Profile key={user.id} userId={user.id} styleCss="profile-stack" />
                    ))}
                    {userAssigned.length > 3 && (
                        <div className="profile_project extra-count">+{userAssigned.length - 3}</div>
                    )}
                </div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
            )}

            {assignDrop && <AssingDropdown tarea={tarea} users={users} userAssigned={userAssigned} setUserAssigned={setUserAssigned} reloadAssigned={loadUsersAssigned} onClose={() => setAssignDrop(false)} />}
        </div>
    );
}

export default Assigne;
