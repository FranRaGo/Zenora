import React, {} from "react";

const TaskInfo = ({tarea, onClose}) => {

    return(
        <div className="div-info-tasks">
            <div className="header-fromPopUp">
                <h2>Task Info</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p>{tarea.title}</p>
            <p>{tarea.description}</p>
            <p>{tarea.due_date}</p>
             <p>{tarea.priority}</p>
              <p>{tarea.status}</p>
            <div>
                <button>Save Changes</button>
                <button>Discard Changes</button>
            </div>
        </div>
    )
}

export default TaskInfo;