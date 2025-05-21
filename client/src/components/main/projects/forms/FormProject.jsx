import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";
import Profile from "../../../global/profile/profile";


const FromProject = ({ user, onClose, usersSpace, modul, onReload }) => {
    const [desc, setDesc] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [usersAssigned, setUsersAssigned] = useState([]);
    const [openSelectAssign, setOpenSelectAssign] = useState(false);

    const [bannerFileName, setBannerFileName] = useState("Choose a banner");

    const ref = useRef();
    const popupRef = useRef();
    useClickOutside(ref, onClose);
    useClickOutside(popupRef, () => setOpenSelectAssign(false));

    /* Assign */
    useEffect(() => {
        if (user) {
            setUsersAssigned([{ ...user, isMember: true }]);
        }
    }, [user]);

    const assignUser = (newUser) => {
        if (newUser.id === user.id) return; // No volver a asignar al creador
        setUsersAssigned((prev) => {
            if (prev.find((u) => u.id === newUser.id)) return prev;
            return [...prev, { ...newUser, isMember: false }];
        });
    };

    const removeUser = (userId) => {
        if (userId === user.id) return; // No se puede quitar al creador
        setUsersAssigned((prev) => prev.filter((u) => u.id !== userId));
    };

    const toggleMember = (userId) => {
        if (userId === user.id) return; // El creador siempre es manager
        setUsersAssigned((prev) =>
            prev.map((u) =>
                u.id === userId ? { ...u, isMember: !u.isMember } : u
            )
        );
    };

    /* Banner */

    const isImage = (file) => file && file.type.startsWith("image/");

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!isImage(file)) {
            alert("File must be an image");
            e.target.value = "";
            return;
        }
        const shortName = file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
        setBannerFileName(shortName);
    };

    const clearBanner = (e) => {
        e.stopPropagation();
        setBannerFileName("Choose a banner");
        document.getElementById("banner").value = "";
    };

    /* Crear project */
    const createProject = async () => {
        const title = document.getElementById("title").value.trim();
        const description = desc.trim();
        if (!title || !description) {
            alert("Title and description are required");
            return;
        }

        const modSpaceId = modul.modSpaceId;
        const dueDate = selectedDate ? selectedDate.toISOString().split("T")[0] : null;

        const bannerInput = document.getElementById("banner");
        const file = bannerInput.files[0];
        let banner = null;
        let fileType = null;

        if (file && file.type.startsWith("image/")) {
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            banner = base64;
            fileType = file.type;
        }

        const projectData = {
            title,
            description,
            due_date: dueDate,
            mod_space_id: modSpaceId,
            banner,
            file_type: fileType,
        };

        try {
            const res = await fetch("http://localhost:3000/api/project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                console.error("❌ No se pudo parsear como JSON:", text);
                throw new Error("Respuesta no válida del servidor");
            }

            if (!res.ok) throw new Error(data.error || "Error creating project");

            const projectId = data.projectId;
            console.log("Users assigned:", usersAssigned);

            for (const user of usersAssigned) {
                const manager = user.isMember === true ? 1 : 0;
                const assignRes = await fetch("http://localhost:3000/api/assigProject", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        projectId,
                        userId: user.id,
                        manager
                    })
                });

                const assignText = await assignRes.text();
                if (!assignRes.ok) {
                    console.error("❌ Error al asignar usuario", user.id, assignText);
                } else {
                    console.log("✅ Usuario asignado:", user.id);
                }
            }

            onReload?.();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to create project");
        }
    };


    return (
        <div className="formPopUp form-project" ref={ref}>
            <div className="header-fromPopUp">
                <h2>Create Project</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="form-fields">
                <label htmlFor="title" className="sr-only">Project name</label>
                <input type="text" name="title" id="title" placeholder="Name of the project" />

                <ExpandableInput value={desc} onChange={setDesc} />

                <div className="banner-upload">
                    <label htmlFor="banner" className="banner-label-wrapper">
                        <span className="banner-label">{bannerFileName}</span>
                        {bannerFileName !== "Choose a banner" && (
                            <button className="btn-clear-banner" onClick={clearBanner}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </label>
                    <input type="file" name="banner" id="banner" className="input-file" accept="image/*" onChange={handleBannerChange} hidden/>
                </div>

                <div className={selectedDate ? "input-with-duedate date-wrapper" : "input-without-duedate date-wrapper"}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        customInput={
                            <div className="date-custom-container">
                                <button className="date-button-custom">
                                    {selectedDate ? (
                                        <div className="selected-date-display">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                            {selectedDate.toLocaleDateString("es-ES")}
                                        </div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    )}
                                </button>
                                {selectedDate && (
                                    <button
                                        className="btn-clear-banner"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDate(null);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="14" height="14">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        }
                    />
                </div>

                <button className="btn-assign-project" onClick={() => setOpenSelectAssign(true)}>
                    {usersAssigned.length > 0 ? (
                        <div className="assigned-users">
                            {usersAssigned.slice(0, 3).map((user) => (
                                <Profile key={user.id} userId={user.id} styleCss="profile-stack" />
                            ))}
                            {usersAssigned.length > 3 && (
                                <div className="profile_project extra-count">+{usersAssigned.length - 3}</div>
                            )}
                        </div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    )}
                </button>

                {openSelectAssign && (
                    <div className="popup-assign-user" ref={popupRef}>
                        <h4>Seleccionados</h4>
                        {usersAssigned.map(user => (
                            <div key={user.id} className="user-entry">
                                <div className="user-info">
                                    <Profile userId={user.id} styleCss="profile_project" />
                                    <p>{user.first_name} {user.last_name}</p>
                                </div>
                                <div className="user-actions">
                                    <button onClick={() => toggleMember(user.id)}>
                                        {user.isMember ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#476ff1" stroke="#476ff1" width="20" height="20">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        )}
                                    </button>
                                    <button id="remove-assign-project" onClick={() => removeUser(user.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <h4>No asignados</h4>
                        {usersSpace.filter(u => !usersAssigned.some(a => a.id === u.id)).map(user => (
                            <div key={user.id} className="user-entry" onClick={() => assignUser(user)}>
                                <div className="user-info">
                                    <Profile userId={user.id} styleCss="profile_project" />
                                    <p>{user.first_name} {user.last_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button className="btn-create" onClick={createProject}>Create Project</button>
        </div>
    );
};

export default FromProject;