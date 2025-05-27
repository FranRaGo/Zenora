import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getActiveSpace } from "../utils/getActiveSpace";
import { getActiveUser } from "../utils/getActiveUser";

import NavBar from '../components/main/nav/Nav';
import Header from '../components/main/header/Header';
import Home from '../components/main/home/Home';
import Projects from '../components/main/projects/Project';
import Chat from '../components/main/chat/Chat';
import Employees from "../components/main/employees/Employes";
import Add from '../components/main/add/Add';
import Settings from "../components/main/settings/Settings";
import ChangePlan from "../components/global/ChangePlan";

const apiURL = import.meta.env.VITE_API_URL;

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [space, setSpace] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [changeSettings, setChangeSettings] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("activeToken");
        const spaceToken = localStorage.getItem("activeSpace");

        if (!userToken) navigate('/login');
        else if (!spaceToken) navigate('/launchpad');
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            const userToken = localStorage.getItem("activeToken");
            const spaceToken = localStorage.getItem("activeSpace");
            if (!userToken || !spaceToken) return;

            const fetchedUser = await getActiveUser();
            const fetchedSpace = await getActiveSpace();
            setUser(fetchedUser);
            setSpace(fetchedSpace);
        };
        fetchData();
    }, [changeSettings]);

    useEffect(() => {
        if (user === null || space === null) return;
        if (!user?.id) navigate('/login');
        else if (!space?.id) navigate('/launchpad');
    }, [user, space, navigate]);

    const idSpace = space?.id;
    const idUser = user?.id;

    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem("section") || "home";
    });

    useEffect(() => {
        localStorage.setItem("section", activeSection)
    }, [activeSection])

    //get all users of space
    const [usersSpace, setUsersSpace] = useState(null);
    useEffect(() => {
        const loadUserSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`${apiURL}/api/usersSpace/${space.id}`);
                if (res.ok) {
                    const resData = await res.json();
                    setUsersSpace(resData);
                }
            } catch (err) {
                console.error("Error al cargar usuarios del espacio", err);
            }
        }
        loadUserSpace();
    }, [space]);

    //get los modulos del espacio para saber que modulos tiene
    const [modul, setModul] = useState(null);

    useEffect(() => {
        const getModulSpace = async () => {
            if (!space) return;
            try {
                const res = await fetch(`${apiURL}/api/modules/${space.id}`);
                if (res.ok) {
                    const data = await res.json();
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id === 1) {
                            setModul(data[i]);
                        }
                    }
                }
            } catch (err) {
                console.error("Error en el get modulos", err);
            }
        }
        getModulSpace();
    }, [space]);

    //getUsuario y sus permisos
    const [userFinal, setUserFinal] = useState(null);

    useEffect(() => {
        if (user && usersSpace) {
            const found = usersSpace.find(us => us.id === user.id);
            setUserFinal(found);
        }
    }, [user, usersSpace]);

    return (
        <div id="main-wrapper">
            <div id="circle-background"></div>
            <div className="main-layout">
                < Header user={user} setActiveSection={setActiveSection} />
                <div className="main-content">
                    < NavBar activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen} />
                    <div className={`${activeSection === "chat" ? "chatActive" : "main-view"}`}>
                        {activeSection === "home" && <Home user={user}/>}
                        {activeSection === "projects" && <Projects user={userFinal} usersSpace={usersSpace} modul={modul} />}
                        {isAddOpen === true && < Add user={userFinal} onClose={() => setIsAddOpen(false)} usersSpace={usersSpace} modul={modul} />}
                        {activeSection === "employees" && <Employees idUser={idUser} space={space} userInfo={userFinal}/>}
                        {activeSection === "chat" && <Chat idUser={idUser} />}
                        {activeSection === "settings" && <Settings setChangeSettings={setChangeSettings} changeSettings={changeSettings} space={space} userInfo={user}/>}
                        {activeSection === "changePlan" && <ChangePlan />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;

// const location = useLocation();
// const idSpace = location.state?.id;
// const idUser = location.state?.idUser;