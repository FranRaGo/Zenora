import React, { useState } from "react";
import '../../../styles/app.css';
import FromProject from "../projects/forms/FormProject";

const Add = ({ onClose, usersSpace, modul, getProjects }) => {
    const [formProject, setFormProject] = useState(false);
    const [formTask, setFormTask] = useState(false);

    
    return (
        <>
            {formProject && <FromProject onClose={() => setFormProject(false)} usersSpace={usersSpace} modul={modul} onReload={getProjects} />}
            {formTask && <FormTask project={null} status={null} users={null} onClose={() => setFormTask(false)} />}

            <div className="modal-backdrop">
                <div className="modal-content">
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2>Popup de añadir algo</h2>
                    <div>
                        <p>Projects</p>
                        <button onClick={()=> setFormProject(true)}>add</button>
                    </div>
                    <div>
                        <p>Tasks</p>
                        <button onClick={()=> setFormTask(true)}>add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add;