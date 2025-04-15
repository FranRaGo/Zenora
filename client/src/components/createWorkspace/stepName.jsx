import React from "react";
import { useNavigate } from 'react-router-dom';


const NewName = ({onSuccess}) => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate('/launchpad');
    }

    return(
        <div>
            <button onClick={goBack}>ir para ataras</button>
            <h1>Creacion de workspace</h1>
            <label htmlFor="">Pon el nombre de tu workspace</label>
            <input type="text" />
            <button>next</button>
        </div>
    )
}

export default NewName;