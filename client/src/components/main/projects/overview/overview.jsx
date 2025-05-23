import React, { useState } from "react";

import MyTasks from "./myTasks";
import MyProjects from "./myProjects";
import Activity from "./myProjects";
import Calendar from "./myProjects";

const Overview = ({ user, modul, projectData, usersSpace }) => {
  
  return (
    <div id="overview-container">
      <div className="overview-top">
        <MyTasks user={user} modul={modul} projectData={projectData} usersSpace={usersSpace} />
        <MyProjects user={user} modul={modul} projectData={projectData} usersSpace={usersSpace}/>
      </div>

      <div className="overview-bottom">
        <Activity />
        <Calendar />
      </div>
    </div>
  );
};

export default Overview;
