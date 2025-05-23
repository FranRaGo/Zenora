import React, { useState, useEffect } from "react";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskItemKanban = ({ tarea }) => {
  return (
    <div className="task-item-kanban">
      <div className="title-tasks">
        <p>{tarea.title}</p>
      </div>
    </div>
  );
};

export default TaskItemKanban;
