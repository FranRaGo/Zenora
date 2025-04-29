import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import '../styles/launchpad.css';

const LaunchPad = () => {
    const [user, setUser] = useState(null);
    const [spaces, setSpaces] = useState(null);
    const navigate = useNavigate();
    const [dropdown, setDrop] = useState(false);

    const [popupAbiertoId, setPopupAbiertoId] = useState(false);
    const [popupCoords, setPopupCoords] = useState({ top: 0, left: 0 });

    const userEmail = localStorage.getItem("activeLog");

    // Cargar datos del usuario por su email
    useEffect(() => {
        if (!userEmail) {
            navigate('/login');
            return;
        }

        const getUsersData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/usersFilter/email/${userEmail}`);
                if (res.ok) {
                    const userData = await res.json();
                    console.log("Usuario encontrado:", userData[0]);
                    setUser(userData[0]);
                }
            } catch (err) {
                console.error("Error al buscar usuario:", err);
            }
        };

        getUsersData();
    }, [navigate, userEmail]);//cuando cambie el email del localstorage

    // Cuando ya tengas el usuario (y su id), buscamos su espacio
    useEffect(() => {
        if (!user || !user.id) return;

        const getSpace = async () => {
            try {
                console.log("La id es " + user.id);
                const res = await fetch(`http://localhost:3000/api/spaceUser/${user.id}`);
                if (res.ok) {
                    const spaceData = await res.json();
                    setSpaces(spaceData);
                    console.log("Espacios:", spaceData);
                }
            } catch (err) {
                console.error("Error al buscar espacio:", err);
            }
        };

        getSpace();
    }, [user]); // solo se ejecuta cuando cambie user

    const openWorkspace = (e) => {
        console.log(e.target.id);
        navigate('/', { state: { id: e.target.id } });
    }

    const joinedSpaces = spaces?.filter(space => space.owner === 0) || [];
    const ownSpaces = spaces?.filter(space => space.owner === 1) || [];

    const joinWorkspace = () => {
        navigate('/joinWorkspace');
    }

    const createWorkspace = () => {
        navigate('/createWorkspace', { state: { id: user.id } });
    }

    const changeStatus = () => {
        setDrop(!dropdown);
    }

    const optionsNav = (id, e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("poner predeterminado" + id);
    }

    return (
        <div className="container-launchpad">
            <div id='redonda'></div>
            <div className="div-launchpad">

                <div className="div-perfil-pec" onClick={changeStatus}>
                    <button id="btn-perfil">
                        <p>{user?.first_name[0]}</p>
                    </button>
                    {dropdown ? (
                        <>
                            {/* Flecha arriba */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                            {/* Popup cerrar sesión */}
                            <div className="dropdown-popup">
                                <button>Añadir Cuenta</button>
                                <button onClick={() => {
                                    localStorage.removeItem("activeLog");
                                    navigate("/login");
                                }}>
                                    Cerrar sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        // Flecha abajo
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </div>



                <div className="myWorkspace">
                    <div className="workspace-header">
                        <h2>Your Workspace</h2>
                    </div>
                    <div id="showMyWorkspace">
                        {ownSpaces.length > 0 ? (
                            ownSpaces.map((space) => (
                                <div key={space.id} id={space.id} onClick={openWorkspace} className="workspace-card">
                                    {space.logo === null ? (
                                        <div className="draft-logo">
                                            <p>{space.name[0]}</p>
                                        </div>
                                    ) : (
                                        <p>el logo</p>
                                    )}
                                    <p>{space.name}</p>
                                    <button id="option-space" onClick={(e) => optionsNav(space.id, e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-workspace">You’re not part of a workspace yet.</p>
                        )}
                    </div>
                    <div className="actions">
                        <button className="btn-add" onClick={createWorkspace}>+</button>
                        <span>Create Workspace</span>
                    </div>
                </div>
                <div className="joinedWorkspace">
                    <div className="workspace-header">
                        <h2>Joined Workspace</h2>
                    </div>
                    <div id="showMyWorkspace">
                        {/* si hay espacios en los que te has unido los recorre */}
                        {joinedSpaces.length > 0 ? (
                            joinedSpaces.map((space) => (
                                <div key={space.id} id={space.id} className="workspace-card">
                                    {space.logo === null ? (
                                        <div className="draft-logo">
                                            <p>{space.name[0]}</p>
                                        </div>
                                    ) : (
                                        <p>Tiene logo</p>
                                    )}
                                    <p>{space.name}</p>
                                    <button id="option-space" onClick={(e) => optionsNav(space.id, e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-workspace">You’re not part of a workspace yet.</p>
                        )}
                    </div>
                    <div className="actions">
                        <button className="btn-add" onClick={joinWorkspace}>+</button>
                        <span>Join workspace</span>
                    </div>
                </div>
                <div className="invitations">
                    <button id="emailbox">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            {popupAbiertoId && (
                <div
                    className="popup-drive-style"
                    style={{
                        position: "absolute",
                        top: popupCoords.top,
                        left: popupCoords.left,
                        zIndex: 1000,
                    }}
                >
                    <ul>
                        <li onClick={() => console.log("Renombrar", popupAbiertoId)}>Renombrar</li>
                        <li onClick={() => console.log("Duplicar", popupAbiertoId)}>Duplicar</li>
                        <li onClick={() => console.log("Eliminar", popupAbiertoId)}>Eliminar</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LaunchPad;
