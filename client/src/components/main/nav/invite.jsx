import React, { useState, useEffect } from "react";
import { getActiveSpace } from "../../../utils/getActiveSpace";

const Invite = () => {
    const [ space, setSpace ] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const res = await getActiveSpace();
            console.log("Respuesta getActiveSpace:", res);
            setSpace(res);
        }  
        
        loadSpace();
    }, [])

    return(
        <div className="div-invite">
            <button>x</button>
            oppopp
            <h1>Invitar</h1>
            <label htmlFor="">Escribe el correo del usuario</label>
            <input type="text"/>
            <p>{space?.invitation_code}</p>
            <p>Copia el codigo de invitacion de tu espacio. ten cuidado a quien le pasas el codigo</p>
            <p></p>
        </div>
    )
}

export default Invite