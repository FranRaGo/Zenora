import React from "react";

const Menu = ({ status, activeSection, setActiveSection, setIsAddOpen, onlyIcons }) => {

    return (
        <div className={status ? "div-perfil" : "div-perfil-colapsed"} >
                <button onClick={() => setActiveSection("home")} className={`${status ? "btn-nav" : "btn-nav-colapsed"} ${activeSection === "home" ? "active-menu" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={activeSection === "home" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19Z"/>
                    </svg>
                    {(!onlyIcons && status) ? <p>Home</p> : ""}
                </button>
                <button onClick={() => setActiveSection("projects")} className={`${status ? "btn-nav" : "btn-nav-colapsed"} ${activeSection === "projects" ? "active-menu" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={activeSection === "projects" ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                    </svg>
                    {(!onlyIcons && status) ? <p>Projects</p> : ""}
                </button>
                <button onClick={() => setIsAddOpen(true)} className={`${status ? "btn-nav" : "btn-nav-colapsed"} ${activeSection === "add" ? "active-menu" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill={activeSection === "add" ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" color="currentColor"/>
                    </svg>
                    {(!onlyIcons && status) ? <p>Add</p> : ""}
                </button>
                <button onClick={() => setActiveSection("chat")} className={`${status ? "btn-nav" : "btn-nav-colapsed"} ${activeSection === "chat" ? "active-menu" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={activeSection === "chat" ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    {(!onlyIcons && status) ? <p>Chat</p> : ""}
                </button>
                <button onClick={() => setActiveSection("employees")} className={`${status ? "btn-nav" : "btn-nav-colapsed"} ${activeSection === "employees" ? "active-menu" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={activeSection === "employees" ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    {(!onlyIcons && status) ? <p>Employees</p> : ""}
                </button>
        </div>
    );
};

export default Menu;
