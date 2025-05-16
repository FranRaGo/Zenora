import React, { useState, useEffect } from "react";
import "../../../styles/projects.css";

import MenuProjects from "./MenuProjects";
import Overview from "./overview/overview";
import List from "./list/List";
import Kanban from "./kanban/Kanban";
import Calendar from "./calendar/calendar";

const Project = () => {
    const [active, setActive] = useState(() => {
        return localStorage.getItem('listProject') || 'overview';
    });

    useEffect(() => {
        localStorage.setItem('listProject', active);
    }, [active]);

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
