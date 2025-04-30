import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavBar from '../components/main/nav/nav';
import Header from '../components/main/header/header';
import Home from '../components/main/home/home';
import Projects from '../components/main/projects/project';
import Chat from '../components/main/chat/chat';
import Employees from "../components/main/employees/employes";
import Add from '../components/main/add/add';

const Main = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const idSpace = location.state?.id;
    // const idUser = location.state?.idUser;
    
    const activeId = JSON.parse(localStorage.getItem("activeId"));
    const idSpace = activeId.spaceId;
    const idUser = activeId.userId;

    const [activeSection, setActiveSection] = useState("home");
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        if (!activeId) {
            navigate('/launchpad');
        }
    }, [activeId]);



    return (
        <div id="main-wrapper">
            <div id="circle-background"></div>
            <div className="main-layout">
                < Header />
                <div className="main-content">
                    < NavBar activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen} />
                    <div className={`${activeSection === "chat" ? "chatActive" : "main-view"}`}>
                        {activeSection === "home" && <Home  />}
                        {activeSection === "projects" && <Projects />}
                        {isAddOpen === true && < Add onClose={() => setIsAddOpen(false)} />}
                        {activeSection === "employees" && <Employees />}
                        {activeSection === "chat" && <Chat  />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;