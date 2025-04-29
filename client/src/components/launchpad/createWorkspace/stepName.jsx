import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const NewName = ({ name: initialName, onSuccess, id }) => {
    const [name, setName] = useState(initialName || '');
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/launchpad');
    }

    const succes = () => {
        const error = document.getElementById("error-name");
        const input = document.getElementById("workspace-name-input");
        if (name.trim() === '') {
            input.classList.add("inputError");
            error.classList.add("showError");
        }else{
            input.classList.remove("inputError");
            error.classList.remove("showError");
            onSuccess(name);
        }
    }

    return (
        <div className="step-name-container">
            <button onClick={goBack} className="btn-back">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="div-title-space">
                <h1>Creación de workspace</h1>
            </div>

            <div className="input-group">
                <label htmlFor="workspace-name-input">Pon el nombre de tu workspace</label>
                <input type="text" name="name" id="workspace-name-input" value={name} onChange={(e) => setName(e.target.value)} />
                <p id="error-name" className="error">Fill in the input please</p>
            </div>

            <button onClick={succes} className="btn-next">Next</button>
        </div>
    )
}

export default NewName;