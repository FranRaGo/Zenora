import React from "react";

const MyTasks = () => {

  return (
    <div id="mytasks-container">
        <h2>My tasks</h2>
        <input type="date"/>

        <div>
            <div>
                <input type="radio" />
                <p>titulo de la tarea</p>
                <button>prioridad</button>
                <button>eliminar</button>
            </div>
        </div>
    </div>
  );
};

export default MyTasks;
