import React, { useState, useEffect, useCallback } from "react";
import "../../../styles/projects.css";

import { getActiveUser } from "../../../utils/getActiveUser";
import { getActiveSpace } from "../../../utils/getActiveSpace";

import MenuProjects from "./MenuProjects";
import Overview from "./overview/overview";
import List from "./list/List";
import Kanban from "./kanban/Kanban";
import Calendar from "./calendar/calendar";

const Project = ({ usersSpace, modul, projectData, setProjectData, getProjects }) => {
    //get el menu activo
    const [active, setActive] = useState(() => {
        return localStorage.getItem('listProject') || 'overview';
    });

    useEffect(() => {
        localStorage.setItem('listProject', active);
    }, [active]);

    //getUsuario y sus permisos
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const res = await getActiveUser();
            setUser(res);
        }
        loadUser();
    }, []);

    //get Usuario activo
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        }
        loadSpace();
    }, []);

    


    return (
        <div className="main-projects-view">
            <MenuProjects active={active} setActive={setActive} />
            {active === "overview" && <Overview user={user} space={space} modul={modul} projectData={projectData} usersSpace={usersSpace} />}
            {active === "list" && <List user={user} space={space} modul={modul} projectData={projectData} setProjectData={setProjectData} usersSpace={usersSpace} getProjects={getProjects}/>}
            {active === "kanban" && <Kanban user={user} space={space} />}
            {active === "calendar" && <Calendar user={user} space={space} />}
        </div>
    );
}

export default Project;
