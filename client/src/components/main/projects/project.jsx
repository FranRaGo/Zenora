import React, { useState } from "react";
import "../../../styles/projects.css";

import MenuProjects from "./MenuProjects";
import Overview from "./overview/overview";
import List from "./List";
import Kanban from "./Kanban";
import Calendar from "./Calendar";

const Project = () => {
    const [active, setActive] = useState('overview');

    console.log("El que está activo es:", active);

    return (
        <div className="main-projects-view">
            <MenuProjects active={active} setActive={setActive} />
            {active === "overview" && <Overview />}
            {active === "list" && <List />}
            {active === "kanban" && <Kanban />}
            {active === "calendar" && <Calendar />}
        </div>
    );
}

export default Project;
