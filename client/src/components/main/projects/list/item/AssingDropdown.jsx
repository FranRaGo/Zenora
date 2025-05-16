import React, { useRef } from "react";
import Profile from "../../../../global/profile/profile";
import useClickOutside from "../../../../../utils/useClickOutside";


const AssingDropdown = ({ tarea, users, userAssigned, setUserAssigned, onClose }) => {
    const ref = useRef();
    useClickOutside(ref, onClose);

    console.log("Dentro de assign dropdown, usuarios asignados", userAssigned);
    const notAssigned = users.filter(
        (user) => !userAssigned.some((u) => u.id === user.id)
    );

    const deleteAssignTask = () => {
        //eleiminar el usuario assignado a la tarea y acualizar la vista manteniendo el dropdown abierto
    }

    const assignUserTask = () => {
        //añadir a la tarea y actualizar la vista con el popup desplegado para ver que ya esta assignado
    }

    return (
        <div className="popup-assign-task" ref={ref}>
            <p>Assigned users: </p>
            {userAssigned.map((user) => (
                <div key={user.id} className="user-item-assign">
                    <Profile key={user.id} userId={user.id} styleCss="profile_project" />
                    <p>{user.first_name} {user.last_name}</p>
                    <button id="btn-desAssignUser" onClick={deleteAssignTask}>x</button>
                </div>
            ))}
            <p>Por assignar: </p>
            {notAssigned.map((user) => (
                <div key={user.id} className="user-item-assign" onClick={assignUserTask}>
                    <Profile key={user.id} userId={user.id} styleCss="profile_project" />
                    <p>{user.first_name} {user.last_name}</p>
                </div>
            ))}
        </div>
    );
}

export default AssingDropdown;