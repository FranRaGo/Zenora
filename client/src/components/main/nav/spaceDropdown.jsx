import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const SpaceDropdown = ({ space, setActiveSection }) => {
    const navigate = useNavigate();

    return (
        <div className="dropdown-space">
            <div id="btn-profile-expanded">
                <div id="avatar-container-expanded">
                    <p id="workspace-name" className="fade-text">
                        {space.name?.charAt(0).toUpperCase()}
                    </p>
                </div>

                {/* Name + dropdown icon */}
                <div id="name-arrow-container">
                    <p id="workspace-name" className="fade-text">
                        {space.name.length > 8 ? space.name.slice(0, 8) + "…" : space.name}
                    </p>
                </div>
            </div>

            <div>
                <button onClick={() => setActiveSection("settings")}>ajustes</button>
                <button onClick={()=> navigate('/launchpad')}>launchpad</button>
                <button onClick={() => setActiveSection("changePlan")}>subir de plan</button>
            </div>
        </div>
    )
}

export default SpaceDropdown;