import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";

const FormTask = ({ project, status, users, onClose }) => {
    const [desc, setDesc] = useState('');
    
    const ref = useRef();
    useClickOutside(ref, onClose);

    return(
        <div className="formPopUp form-task" ref={ref}>
            <h2>Task</h2>
            <select name="" id="">
                {/*select de proyecetos */}
            </select>
            
            <label htmlFor="title" className="sr-only">Tasks name</label>
            <input type="text" name="title" id="title" placeholder="Name of the tasks" />

            <ExpandableInput value={desc} onChange={setDesc} />

            <div className="options">
                <select name="" id="">
                    {/*select de estado */}
                </select>
                <select name="" id="">
                    {/*select de usuarios del proyecto */}
                </select>
                
                {/*input select duedate */}
                {/*input select prioridad */}

                <button>Create Tasks</button>
            </div>
        </div>
    )
}

export default FormTask;