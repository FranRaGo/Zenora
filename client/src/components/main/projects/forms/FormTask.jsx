import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";

const FormTask = ({ project, status, users, onClose }) => {
    const [desc, setDesc] = useState('');
    
    const ref = useRef();
    useClickOutside(ref, onClose);

    const createTasks = () => {
        console.log("crear tarea");
    }

    return(
        <div className="formPopUp form-task" ref={ref}>
            <h2>Task</h2>
            {project ? ( 
                <p>tiene proyecto entonces no select</p>
            ):(
                <p>No tiene proyecto selected</p>
            )}

            <label htmlFor="title" className="sr-only">Tasks name</label>
            <input type="text" name="title" id="title" placeholder="Name of the tasks" />

            <ExpandableInput value={desc} onChange={setDesc} />

            <div className="options">
                <button>Stauts</button>
                <button>Assigne</button>
                <button>DueDate</button>
                <button>Priority</button>

                <button onClick={createTasks}>Create Tasks</button>
            </div>
        </div>
    )
}

export default FormTask;