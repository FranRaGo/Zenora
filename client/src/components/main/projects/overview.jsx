import React from "react";

const Overview = () => {
  return (
    <div id="overview-container">
      <div className="overview-top">
        <div className="overview-tasks" id="task-panel">
          <h2>My Tasks</h2>
          {/* div donde van tus tareas filtradas por fecha */}
          <div className="task-list" />
        </div>

        <div className="overview-projects" id="project-panel">
          <h2>My Projects</h2>
          {/* div donde van los proyectos como tarjetas */}
          <div className="project-carousel" />
        </div>
      </div>

      <div className="overview-bottom">
        <div className="overview-activity" id="activity-panel">
          <h2>Activity</h2>
          {/* div donde va la actividad del usuario */}
          <div className="activity-graph" />
        </div>

        <div className="overview-calendar" id="calendar-panel">
          <h2>Calendar</h2>
          {/* div de calendario */}
          <div className="calendar-grid" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
