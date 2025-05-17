import React, { } from "react";

const AssignProject = () => {
    return (
        <div>
            <div className="popup-assign-user">
                <h4>Seleccionados</h4>
                {projectUsers[pr.id].map(user => (
                    <div key={user.id} className="user-entry">
                        <div className="user-info">
                            <Profile userId={user.id} styleCss="profile_project" />
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        <div className="user-actions">
                            <button onClick={() => toggleMember(user.id)}>
                                {user.isMember ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#476ff1" stroke="#476ff1" width="20" height="20">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                )}
                            </button>
                            <button id="remove-assign-project" onClick={() => removeUser(user.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                <h4>No asignados</h4>
                {usersSpace.filter(u => !projectUsers[pr.id].some(a => a.id === u.id)).map(user => (
                    <div key={user.id} className="user-entry" onClick={() => assignUser(user)}>
                        <div className="user-info">
                            <Profile userId={user.id} styleCss="profile_project" />
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AssignProject;