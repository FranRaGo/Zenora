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

        // <div className="btn-priority" onClick={changePriority}>
        //     <svg xmlns="http://www.w3.org/2000/svg" fill={color[priority]} viewBox="0 0 24 24" stroke-width="1" stroke={color[priority]}>
        //         <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
        //     </svg>
        //     <p>{priorityLabels[priority]}</p>
        //     {dropdown && < DropdownPriority priority={priority} taskId={taskId} setPriority={setPriority} />}
        // </div>
    );
}

export default Assigne;

// {assignedUsers && assignedUsers.length > 0 ? (
//                 assignedUsers[pr.id].map((persona) => (
//                     <Profile userId={persona.id} styleCss="profile_project" />
//                 ))
//             ) : (
//                 <>
//                 <button className="btn-add-user" onClick={openAssignTasks}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3 m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11 a6.375 6.375 0 0 1 12.75 0v.109 A12.318 12.318 0 0 1 9.374 21 c-2.331 0-4.512-.645-6.374-1.766Z" />
//                     </svg>
//                 </button>
//                 { assignUsersTask &&  (<div>hh</div>)}
//                 </>
//             )}