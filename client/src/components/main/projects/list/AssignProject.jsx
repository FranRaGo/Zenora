import React, { useEffect, useState, useRef } from "react";
import Profile from "../../../global/profile/profile";

const AssignProject = ({ project, user, usersProject, usersSpace, onClose, getProjects }) => {
    const [usersAssigned, setUsersAssigned] = useState(usersProject || []);
    const ref = useRef();
    const [usuarioComplet, setUsuarioComplet] = useState(null);
    console.log(usuarioComplet);

    const [numMiembros, setNumMiembros] = useState(0);

    useEffect(() => {
        if (user && usersProject?.length > 0) {
            const withPermisos = usersProject.find(us => us.id === user.id);
            if (withPermisos) {
                setUsuarioComplet({ ...user, ...withPermisos });
            }
        }
    }, [user, usersProject]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose?.();
            }
        };

        const timer = requestAnimationFrame(() => {
            document.addEventListener("mousedown", handleClickOutside);
        });

        return () => {
            cancelAnimationFrame(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const unassigned = usersSpace.filter(u => !usersAssigned.some(a => a.id === u.id));

    const assignUser = async (user) => {
        const res = await fetch("http://localhost:3000/api/assigProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                projectId: project.id,
                userId: user.id,
                manager: 0
            })
        });
        await getProjects();
        const data = await res.json();
        console.log("✔️ Resultado:", data);
    };

    const toggleMember = async (user) => {
        const newManager = user.manager === 1 ? 0 : 1;

        try {
            const res = await fetch(`http://localhost:3000/api/userManager/${user.id_assign}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ manager: newManager })
            });
            const data = await res.json();
            await getProjects();
        } catch (err) {
            console.error("❌ Error actualizando manager", err);
        }
    };

    const removeUser = async (user) => {
        try {
            const res = await fetch(`http://localhost:3000/api/assigProject/${user.id_assign}`, {
                method: "DELETE"
            });
            const data = await res.json();
            await getProjects();
        } catch (err) {
            console.error("❌ Error eliminando asignación", err);
        }
    };
    

    return (
        <div className="popup-assign-user-list" ref={ref}>
            <h4>Seleccionados</h4>
            {usersAssigned.map(user => (
                <div key={user.id} className="user-entry">
                    <div className="user-info">
                        <Profile userId={user.id} styleCss="profile_project" />
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className="user-actions">
                        <button
                            className={`${usuarioComplet?.manager !== 1 ? 'btnDisabled' : ''}`}
                            onClick={() => {
                                if (usuarioComplet?.manager === 1 && numMiembros !== 1) {
                                    console.log("No es uno");
                                    toggleMember(user);
                                } else if (numMiembros === 1) {
                                    console.log("Es uno")
                                }
                            }}
                        >
                            {user?.manager === 1 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#476ff1" stroke="#476ff1" strokeWidth="1" width="20" height="20">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            )}
                        </button>


                        <button
                            className={`${usuarioComplet?.manager !== 1 ? 'btnDisabled' : ''}`}
                            onClick={() => {
                                if (usuarioComplet?.manager === 1) {
                                    console.log("Clickastee");
                                    removeUser(user);
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))
            }

            <h4>No asignados</h4>
            {unassigned.map(user => (
                <div
                    key={user.id}
                    className={`user-entry ${usuarioComplet?.manager === 0 ? 'btnDisabled' : ''}`}
                    onClick={() => {
                        if (usuarioComplet?.manager === 1) {
                            assignUser(user);
                        }
                    }}
                >
                    <div className="user-info">
                        <Profile userId={user.id} styleCss="profile_project" />
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssignProject;
