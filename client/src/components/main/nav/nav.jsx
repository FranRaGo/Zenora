import React, { useEffect, useState } from "react";

import '../../../styles/nav.css';

import ProfileIcon from "./IconPerfil";
import Menu from "./Menu";
import Invite from "./Invite";

import useIsMobile from "../../global/useIsMobile";
import { getActiveSpace } from "../../../utils/getActiveSpace";
import { getActiveUser } from "../../../utils/getActiveUser";


const NavBar = ({ activeSection, setActiveSection, setIsAddOpen }) => {
    const [status, setStatus] = useState(false);
    const isMobile = useIsMobile(480);
    const [dropdown, setDropdown] = useState(false);
    const [invite, setInvite] = useState(false);

    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const data = await getActiveUser();
            setUser(data);
        }
        loadUser();
    }, []);

    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        }
        loadSpace();
    }, []);

    useEffect(() => {
        const loadUserSpace = async () => {
            if (!user) return;
            if (!space) return;
            try {
                const res = await fetch(`http://localhost:3000/api/usersSpace/${space.id}`);
                if (res.ok) {
                    const resData = await res.json();
                    const userFind = resData.find((us) => us.id === user.id);
                    setUserRole(userFind);
                }
            } catch (err) {
                console.error("Error al cargar usuarios del espacio", err);
            }
        }

        loadUserSpace();
    }, [space]);

    const changeStatus = () => {
        setStatus(!status);
    };

    const openInvite = () => {
        setInvite(!invite);
    }

    if (isMobile) {
        return (
            <div id="navbar-mobile">
                <Menu status={false} activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen} onlyIcons={true} />
            </div>
        );
    } else {
        return (
            <div id="navbar" className={status ? "expanded" : ""}>
                <div id="general-profile-div" className={status ? "expanded-profile" : ""}>
                    < ProfileIcon status={status} dropdown={dropdown} setDropdown={setDropdown} setActiveSection={setActiveSection} />

                    <button onClick={changeStatus} id="btn-sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16" />
                        </svg>
                    </button>
                </div>

                < Menu status={status} activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen}  />

                <div className={status ? "expandedPerfil invitar" : "invitar"}>
                    <button
                        id="btn-addPeople"
                        className={`${status ? "" : "colapsed"} ${userRole?.role === "client" ? "disabled-btn" : ""}`}
                        onClick={userRole?.role !== "client" ? openInvite : null}
                        disabled={userRole?.role === "client"}
                        title={userRole?.role === "client" ? "No tienes permisos para invitar usuarios" : ""}
                    >
                        <div className="icon-add-people">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <div id="icon-plus">+</div>
                        </div>
                        {status ? <p>Invite</p> : ""}
                    </button>
                    <button id="btn-question">?</button>
                </div>
                {invite ? (
                    <Invite onClose={() => setInvite(false)} clickOut={() => setInvite(false)} />
                ) : null}
            </div>
        );
    }
}

export default NavBar;