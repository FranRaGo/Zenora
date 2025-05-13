import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getActiveSpace } from "../utils/getActiveSpace";
import { getActiveUser } from "../utils/getActiveUser";

import NavBar from '../components/main/nav/nav';
import Header from '../components/main/header/header';
import Home from '../components/main/home/home';
import Projects from '../components/main/projects/project';
import Chat from '../components/main/chat/chat';
import Employees from "../components/main/employees/employes";
import Add from '../components/main/add/add';
import Settings from "../components/main/settings/settings";
import ChangePlan from "../components/global/changePlan";

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("activeToken");
        const spaceToken = localStorage.getItem("activeSpace");
        if (!userToken ) {
            navigate('/login');
        }else if(!spaceToken){
            navigate('/launchpad');
        }
    }, [navigate]);

    useEffect(() => {
        const userToken = localStorage.getItem("activeToken");
        const spaceToken = localStorage.getItem("activeSpace");
        if (!userToken || !spaceToken) return;
    
        const fetchData = async () => {
            const fetchedUser = await getActiveUser();
            const fetchedSpace = await getActiveSpace();
            setUser(fetchedUser);
            setSpace(fetchedSpace);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user === null || space === null) return;
        if (!user?.id) navigate('/login');
        else if (!space?.id) navigate('/launchpad');
    }, [user, space, navigate]);
    
    const idSpace = space?.id;
    const idUser = user?.id;

    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem('lastSection') || 'home';
    });
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('lastSection', activeSection);
    }, [activeSection]);

    
    
    

    return (
        <div id="main-wrapper">
            <div id="circle-background"></div>
            <div className="main-layout">
                < Header user={user} setActiveSection={setActiveSection}/>
                <div className="main-content">
                    < NavBar activeSection={activeSection} setActiveSection={setActiveSection} setIsAddOpen={setIsAddOpen}/>
                    <div className={`${activeSection === "chat" ? "chatActive" : "main-view"}`}>
                        {activeSection === "home" && <Home />}
                        {activeSection === "projects" && <Projects />}
                        {isAddOpen === true && < Add onClose={() => setIsAddOpen(false)} />}
                        {activeSection === "employees" && <Employees />}
                        {activeSection === "chat" && <Chat idUser={idUser} />}
                        {activeSection === "settings" && <Settings />}
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