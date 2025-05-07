import React, { useState, useEffect, use } from "react";
import { useNavigate } from 'react-router-dom';

import Profile from "../../global/profile/profile";
import { getLoggedUsers } from "../../../utils/getLoggedUsers";

const LoggedAcounts = () => {
    const navigate = useNavigate();
    const [subDropdown, setSubDropdown] = useState(false);
    const [users, setUsers] = useState(null);

    const showDropdown = () => {
        setSubDropdown(!subDropdown);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const activeToken = localStorage.getItem("activeToken");
            const allUsers = await getLoggedUsers();

            const filtered = allUsers.filter(user => user.token !== activeToken);
            setUsers(filtered);
        };

        fetchUsers();
    }, []);

    const addUser = () => {
        localStorage.removeItem("activeToken");
        navigate('/login');
    }

    const changeUser = (user) => {
        const token = user.token;
        localStorage.setItem("activeToken", token);
        navigate("/launchpad");
        window.location.reload();
    }

    return (
        <div className="dropdown-loggeds">
            {users && users.length > 0 ? (
                users.map((user, index) => (
                    <div key={index} className="btn-profile-loggeds" onClick={() => changeUser(user)}>
                        <Profile userId={user.id} styleCss={"profile_icon_header"}/>
                        <p>{user.first_name} {user.last_name}</p>
                        <button
                            id="option-profile"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Otras opciones para", user.first_name);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </button>
                    </div>
                ))
            ) : (
                ""
            )}
            <button id="btn-add-user" onClick={addUser}>+ add user</button>
        </div>
    );
}

export default LoggedAcounts;