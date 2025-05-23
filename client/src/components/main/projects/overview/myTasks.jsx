import React, { useState, useEffect } from "react";

const MyTasks = ({ user, modul, projectData, usersSpace }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [tasks, setTasks] = useState([]);

  //api para recoger datos de las tareas del proyecto seleccionado
  const loadTask = async (projectId, date) => {
    try {
      const res = await fetch(`http://localhost:3000/api/projectTaskDate/${projectId}/${date}`);
      const data = await res.json();
      console.log("Tareas recibidas:", data);
      setTasks(data);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
    }
  };


  useEffect(() => {
    if (selectedProject) {
      loadTask(selectedProject, selectedDate);
    }
  }, [selectedProject, selectedDate]);

  useEffect(() => {
    if (projectData.length > 0 && !selectedProject) {
      setSelectedProject(projectData[0].id);
    }
  }, [projectData]);

  return (
    <div className="mytasks-container">
      <h2>Mis Tareas</h2>
      <div>
        <label className="sr-only" htmlFor="project-select">Proyecto: </label>
        <select id="project-select" value={selectedProject || ""}
          onChange={(e) => {
            console.log("Proyecto seleccionado:", e.target.value);
            setSelectedProject(e.target.value);
          }}
        >
          {projectData.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-date" className="sr-only">Fecha: </label>
        <input type="date" id="task-date"
          value={selectedDate}
          minDate={new Date()}
          onChange={(e) => {
            console.log("Fecha seleccionada:", e.target.value);
            setSelectedDate(e.target.value);
          }}
        />
      </div>

      <div className="div-show-tasks-tdy">
        {tasks.length === 0 ? (
          <p className="message-tasks-tdy">No hay tareas para mostrar.</p>
        ) : (

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <p className="task-title">{task.title}</p>
                <div className="task-actions">
                  <span className={`status-dot status-${task.status}`}></span>
                  <button id="btn-delete-task" onClick={() => console.log("Eliminar", task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default MyTasks;
