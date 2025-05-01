import React, { useState, useEffect } from "react";
import { getActiveUser } from "../../../utils/getActiveUser";
import Profile from "../../global/profile/profile";

const ProfileDropdown = ({user}) => {
    const [dropDown, setDropdown ] = useState(false);
    const showDropdown = () => {
        setDropdown(!dropdown);
    }
    
    const close = () => {
        localStorage.removeItem("activeToken");
        navigate("/login");
    }
    
    return(
        <div className="dropdown-popup">
            <div>
                < Profile userId={user.id} styleCss={"caramelo"} color={user.color} />
                <p>{user?.first_name}{user?.last_name}</p>
                <p>v</p>
            </div>
            <div>
                <button>Tu perfil</button>
                <button>Temas</button>
                <button>Ajustes</button>
            </div>
            <button onClick={close}>Cerrar sesión</button>            
        </div>
    )
}

export default ProfileDropdown;