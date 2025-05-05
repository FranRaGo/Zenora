import React, { useState } from "react";

import MyTasks from "./myTasks";
import MyProjects from "./myProjects";
import Activity from "./myProjects";
import Calendar from "./myProjects";

const Overview = () => {

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
