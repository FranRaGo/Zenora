import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../styles/joinWorkspace.css";

const JoinWorkspace = () => {
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/launchpad');
    }

    const succes = () => {

    }

    return (
        <div className="container-joinWorkspace">
            <div id='redonda'></div>

            <div className="div-joinSpace">
                <button onClick={goBack} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div className="div-title-space">
                    <h1>Creación de workspace</h1>
                </div>

                <div className="input-group">
                    <label htmlFor="workspace-name-input">Insert a workSpace code</label>
                    <input type="text" name="name" id="workspace-name-input" onChange={(e) => setCode(e.target.value)} />
                    <p id="error-name" className="error">Fill the code in the input please</p>
                </div>

                <button onClick={succes} className="btn-next">Join</button>

            </div>
        </div> 
    )
}

export default JoinWorkspace;