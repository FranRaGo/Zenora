import React, { useState, useEffect, useCallback } from "react";
import "../../../styles/projects.css";

import { getActiveUser } from "../../../utils/getActiveUser";
import { getActiveSpace } from "../../../utils/getActiveSpace";

import MenuProjects from "./MenuProjects";
import Overview from "./overview/overview";
import List from "./list/List";
import Kanban from "./kanban/Kanban";
import Calendar from "./calendar/calendar";

const Project = ({ user, usersSpace, modul }) => {
    //get el menu activo
    const [active, setActive] = useState(() => {
        return localStorage.getItem('listProject') || 'overview';
    });

    useEffect(() => {
        localStorage.setItem('listProject', active);
    }, [active]);


    //get Usuario activo
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const data = await getActiveSpace();
            setSpace(data);
        }
        loadSpace();
    }, []);

    //cargar los proyectos del espacio y guardar la informacion de usuarios asignados y estado del dropdown
    const [projectData, setProjectData] = useState([]);

    const searchUsers = async (id) => {
        try {
            const users = await fetch(`http://localhost:3000/api/projectUsers/${id}`);
            if (!users.ok) throw new Error("Error searching users project", users.status);
            const usersData = await users.json();
            return usersData;
        } catch (err) {
            console.log("Error ", err);
        }
    }

    const getProjects = useCallback(async () => {
        if (!modul || !modul.modSpaceId || !user) return;

        try {
            const { modSpaceId } = modul;
            const res = await fetch(`http://localhost:3000/api/projectsByUser/${modSpaceId}/${user.id}/${user.role}`);
            if (!res.ok) throw new Error("No se pudieron obtener los proyectos");
            const data = await res.json();

            const result = [];
            for (const p of data) {
                let users = [];
                try {
                    users = await searchUsers(p.id);
                } catch {
                    users = [];
                }

                result.push({
                    ...p,
                    users,
                    isOpen: true,
                    showOptionsPopup: false,
                    showAssignPopup: false,
                });
            }

            setProjectData([]);
            setTimeout(() => setProjectData(result), 0);
        } catch (err) {
            console.error("Error en getProjects:", err);
        }
    }, [modul, user]);


    useEffect(() => {
        getProjects();
    }, [getProjects]);


    return (
        <div className="main-projects-view">
            <MenuProjects active={active} setActive={setActive} />
            {active === "overview" && <Overview user={user} space={space} modul={modul} projectData={projectData} usersSpace={usersSpace} />}
            {active === "list" && <List user={user} space={space} modul={modul} projectData={projectData} setProjectData={setProjectData} usersSpace={usersSpace} getProjects={getProjects} />}
            {active === "kanban" && <Kanban user={user} space={space} />}
            {active === "calendar" && <Calendar user={user} space={space} />}
        </div>
    );
}

export default Project;
