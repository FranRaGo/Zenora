import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import '../styles/launchpad.css';
import { getActiveUser } from "../utils/getActiveUser";
import { getUserSpaces } from "../utils/getUserSpaces";

import ProfilePlus from "../components/global/profile/ProfilePlus";
import AccountDropdown from "../components/launchpad/AccountDropdown/AccountDropdown";
import ShowInvitations from "../components/launchpad/joinWorkspace/ShowInvitations";
import SpaceIcon from "../components/global/profile/SpaceIcon";

const LaunchPad = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [spaces, setSpaces] = useState([]);
    const [dropdown, setDrop] = useState(false);
    const [showInv, setShow] = useState(false);

    const ownSpaces = spaces.filter(space => space.owner === 1);
    const joinedSpaces = spaces.filter(space => space.owner === 0);
    const color = user?.color;
    const idUser = user?.id;

    const loadData = async () => {
        const userData = await getActiveUser();
        if (!userData) {
            navigate("/login");
            return;
        }

        setUser(userData);
        const spaceData = await getUserSpaces(userData.id);
        console.log(spaceData);
        setSpaces(spaceData);
    };

    useEffect(() => {
        loadData();
    }, [navigate]);

    const openWorkspace = async (e) => {
        const idSpace = e.currentTarget.id;
        console.log("Id espacio seleccionado", idSpace);
        try {
            const res = await fetch(`http://localhost:3000/api/space/id/${idSpace}`);
            if (res.ok) {
                const resData = await res.json();
                const token = resData[0]?.token;
                localStorage.setItem("activeSpace", token);
                navigate('/');
            }
        } catch (err) {
            console.log("Error en la extracción de datos del espacio:", err);
        }
    };


    const joinWorkspace = () => {
        navigate('/launchpad/joinWorkspace');
    }

    const createWorkspace = () => {
        navigate('/launchpad/createWorkspace', { state: { id: user.id } });
    }

    const changeStatus = () => {
        setDrop(!dropdown);
    }

    const optionsNav = (id, e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("poner predeterminado" + id);
    }

    const funShowInvitations = () => {
        setShow(!showInv);
    }

    return (
        <div className="container-launchpad">
            <div id='redonda'></div>
            <div className="div-launchpad">

                <div className="div-perfil-pec" onClick={changeStatus}>
                    {idUser && <ProfilePlus userId={user.id} styleCss={"profile_icon_header"} dropdown={dropdown} />}
                    {dropdown && <AccountDropdown user={user} />}
                </div>

                <div className="myWorkspace">
                    <div className="workspace-header">
                        <h2>Your Workspace</h2>
                    </div>
                    <div id="showMyWorkspace">
                        {ownSpaces.length > 0 ? (
                            ownSpaces.map((space) => (
                                <div key={space.id} id={space.id} onClick={openWorkspace} className="workspace-card">
                                    <SpaceIcon spaceId={space.id} styleCss={"profile_icon"} />
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
                                <div key={space.id} onClick={openWorkspace} id={space.id} className="workspace-card">
                                    {space.logo === null ? (
                                        <div className="draft-logo" style={{ backgroundColor: space.color }}>
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
                    <button id="emailbox" onClick={funShowInvitations}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                        </svg>
                    </button>
                    {showInv && <ShowInvitations idUser={idUser} onJoined={loadData}  />}
                </div>
            </div>
        </div>
    );
};

export default LaunchPad;
