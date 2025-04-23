import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../styles/joinWorkspace.css";

const JoinWorkspace = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate('/launchpad');
    }

    return(
        <div className="container-createWorkspace">
            <div id='redonda'></div>

            <div className="div-launchpad">
                <button onClick={goBack} className="btn-back">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
                <label htmlFor="">Pon el codigo de invitacion</label>
                <input type="text" />
                <button>Unirse</button>
            </div>
        </div>
    )
}

export default JoinWorkspace;