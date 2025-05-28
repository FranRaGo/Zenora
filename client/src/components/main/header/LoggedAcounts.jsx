import React, { useState, useEffect, use } from "react";
import { useNavigate } from 'react-router-dom';

import Profile from "../../global/profile/Profile";
import { getLoggedUsers } from "../../../utils/getLoggedUsers";

const LoggedAcounts = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);

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
        localStorage.removeItem("activeSpace");
        localStorage.removeItem("listProject");
        localStorage.removeItem("section");
        navigate("/launchpad");
        window.location.reload();
    }



    return (
        <div className="dropdown-loggeds">
            <div className="users-list-loggeds">
                {users && users.length > 0 ? (
                    users.map((user, index) => {
                        const fullName = `${user.first_name} ${user.last_name}`;
                        const displayName = fullName.length > 10 ? fullName.slice(0, 10) + "…" : fullName;

                        return (
                            <div key={index} className="btn-profile-loggeds" onClick={() => changeUser(user)}>
                                <Profile userId={user.id} styleCss={"profile_icon_header"} />
                                <p>{displayName}</p>
                            </div>
                        );
                    })
                ) : (
                    ""
                )}
            </div>

            <button id="btn-add-user" onClick={addUser}>+ add user</button>
        </div>
    );
}

export default LoggedAcounts;
