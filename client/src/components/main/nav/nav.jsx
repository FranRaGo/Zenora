import React, { useEffect, useState } from "react";

import ProfileIcon from "./iconPerfil";
import Menu from "./menu";
import '../../../styles/nav.css';
import useIsMobile from "../../global/useIsMobile";
import Invite from "./invite";


const NavBar = ({ activeSection, setActiveSection, setIsAddOpen }) => {
    const [status, setStatus] = useState(false);
    const isMobile = useIsMobile(480);
    const [dropdown, setDropdown] = useState(false);
    const [invite, setInvite] = useState(false);

    const changeStatus = () => {
        setStatus(!status);
    };

    const openInvite = () => {
        setInvite(!invite);
        console.log("abrir pop up invitar");
    }

    if (isMobile) {
        return (
            <div id="navbar-mobile">
                <Menu status={false} activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen} onlyIcons={true}/>
            </div>
        );
    } else {
        return (
            <div id="navbar" className={status ? "expanded" : ""}>
                <div id="general-profile-div" className={status ? "expanded-profile" : ""}>
                    < ProfileIcon status={status} dropdown={dropdown}/>

                    <button onClick={changeStatus} id="btn-sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16" />
                        </svg>
                    </button>
                </div>

                < Menu status={status} activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen} />

                <div className={status ? "expandedPerfil invitar" : "invitar"}>
                    <button id="btn-addPeople" className={status ? "" : "colapsed"} onClick={openInvite}>
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
                    <Invite onClose={() => setInvite(false)}/>
                ) : null}
            </div>
        );
    }
}

export default NavBar;