import React, { useState, useEffect, useRef } from "react";
import '../../../styles/app.css';
import FromProject from "../projects/forms/FormProject";
import { getActiveUser } from "../../../utils/getActiveUser";

const Add = ({ user, onClose, usersSpace, modul, getProjects }) => {
    const [formProject, setFormProject] = useState(false);
    const [formTask, setFormTask] = useState(false);

    const ref = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClose]);

    return (
        <>
            {formProject && <FromProject user={user} onClose={() => setFormProject(false)} usersSpace={usersSpace} modul={modul} onReload={getProjects} />}
            {formTask && <FormTask project={null} status={null} users={null} onClose={() => setFormTask(false)} />}

            <div className="modal-backdrop" ref={ref}>
                <div className="modal-content">
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2>Popup de añadir algo</h2>
                    <div>
                        <p>Projects</p>
                        <button
                            onClick={() => {
                                if (user.role !== "client") setFormProject(true);
                            }}
                            disabled={user.role === "client"}
                            style={{
                                cursor: user.role === "client" ? "not-allowed" : "pointer",
                                opacity: user.role === "client" ? 0.5 : 1
                            }}
                        >
                            add
                        </button>
                    </div>

                    <div>
                        <p>Tasks</p>
                        <button
                            onClick={() => {
                                if (user.role !== "client") setFormTask(true);
                            }}
                            disabled={user.role === "client"}
                            style={{
                                cursor: user.role === "client" ? "not-allowed" : "pointer",
                                opacity: user.role === "client" ? 0.5 : 1
                            }}
                        >
                            add
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Add;