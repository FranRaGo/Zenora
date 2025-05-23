import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../../styles/header.css';

import Logo from '../../global/logo';
import useIsMobile from "../../global/useIsMobile";
import ProfilePlus from "../../global/profile/profilePlus";
import ProfileDropdown from "./profileDropdown";


const Header = ({ user, setActiveSection }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile(480);

    const [dropdown, setDropdown] = useState(false);

    const userId = user?.id;
    const color = user?.color;

    const showDropdown = () => {
        setDropdown(!dropdown);
    }

    if (isMobile) {
        return null;
    } else {
        return (
            <div id="header-container">
                <div id="logo" onClick={() => { navigate('/') }}>
                    <Logo />
                </div>
                <div className="header-search">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text" placeholder="Buscar" id="inputSearch" className="input-search" />
                </div>
                <div className="header-actions">

                    <button className="btn-upload-plan" onClick={() => setActiveSection("changePlan")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        <p>Update plan</p>
                    </button>

                    <div className="btn-user-options" onClick={showDropdown}>
                        {userId && <ProfilePlus userId={userId} styleCss={"profile-main"} dropdown={dropdown} />}
                        {dropdown ? (
                            < ProfileDropdown user={user} setActiveSection={setActiveSection} />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;