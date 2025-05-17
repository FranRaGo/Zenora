import React, { useState, useEffect } from "react";
import AssingDropdown from "./AssingDropdown";
import Profile from "../../../../global/profile/profile";

const Assigne = ({ tarea, users }) => {
    const [assignDrop, setAssignDrop] = useState(false);
    const [userAssigned, setUserAssigned] = useState(null);

    useEffect(() => {
        const loadUsersAssigned = async () => {
            const res = await fetch(`http://localhost:3000/api/usersTask/${tarea.id}`);
            if (res.ok) {
                const resData = await res.json();
                console.log("La tarea tiene assignados: ", resData);
                setUserAssigned(resData);
            }
        }
        loadUsersAssigned();
    }, [])

    return (
        <div className="btn-add-user" onClick={() => setAssignDrop(true)}>
            {userAssigned && userAssigned.length > 0 ? (
                <>
                    {userAssigned.map((persona) => (
                        <Profile key={persona.id} userId={persona.id} styleCss="profile_project" />
                    ))}
                </>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3 m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11 a6.375 6.375 0 0 1 12.75 0v.109 A12.318 12.318 0 0 1 9.374 21 c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
            )}

            {assignDrop && <AssingDropdown tarea={tarea} users={users} userAssigned={userAssigned} setUserAssigned={setUserAssigned} onClose={() => setAssignDrop(false)}/>}
        </div>
    );
}

export default Assigne;
