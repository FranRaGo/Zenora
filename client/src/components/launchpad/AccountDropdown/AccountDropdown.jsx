import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getActiveUser } from "../../../utils/getActiveUser";

import Profile from "../../global/profile/Profile";
import SearchAccounts from "./SearchAccounts";

const AccountDropdown = ({ user }) => {
    const navigate = useNavigate();
    const [subDropdown, setSubDropdown] = useState(false);

    const showDropdown = () => {
        setSubDropdown(!subDropdown);
    }

    const close = () => {
        const activeToken = localStorage.getItem("activeToken");
        const storedTokens = JSON.parse(localStorage.getItem("loggedTokens") || "[]");

        // Filtrar y eliminar el token actual del array
        const updatedTokens = storedTokens.filter(token => token !== activeToken && token !== "");

        // Actualizar el localStorage
        localStorage.setItem("loggedTokens", JSON.stringify(updatedTokens));
        localStorage.removeItem("activeToken");
        localStorage.removeItem("activeSpace"); // opcional, si también quieres limpiar el espacio activo

        navigate("/login");
    };

    return (
        <div className="dropdown-popup">
            <button id="btn-profile-dropdown" onClick={(e) => { e.stopPropagation(); showDropdown(); }}>
                < Profile userId={user.id} styleCss={"profile_icon_header"} color={user.color} />
                <p>{user?.first_name}{user?.last_name}</p>
                {subDropdown ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                )}
            </button>
            {subDropdown && <SearchAccounts />}
            <button id="btn-logout" onClick={close}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                <p>Log out</p>
            </button>
        </div>
    )
}

export default AccountDropdown;