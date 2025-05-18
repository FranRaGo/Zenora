import React, { useState } from "react";

import MyTasks from "./myTasks";
import MyProjects from "./myProjects";
import Activity from "./myProjects";
import Calendar from "./myProjects";

const Overview = ({user, space, modul, projectData, usersSpace}) => {
  
  return (
    <div id="overview-container">
      <div className="overview-top">
        <MyTasks />
        <MyProjects />
      </div>

      <div className="overview-bottom">
        <Activity />
        <Calendar />
      </div>
    </div>
  );
};

export default Overview;
