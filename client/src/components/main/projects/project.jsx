import React, { useState, useEffect } from "react";
import "../../../styles/projects.css";

import MenuProjects from "./MenuProjects";
import Overview from "./overview/overview";
import List from "./list/list";
import Kanban from "./kanban/kanban";
import Calendar from "./calendar/calendar";

const Project = () => {
    const [active, setActive] = useState(() => {
        return localStorage.getItem('lastMenuProject') || 'overview';
    });

    useEffect(() => {
        localStorage.setItem('lastMenuProject', active);
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
