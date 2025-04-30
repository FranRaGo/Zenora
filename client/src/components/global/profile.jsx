import React, { useEffect } from "react";

const Profile = ({idUser, styleCss}) => {
    useEffect(()=>{
        const searchUser = async () => {
            try{
                
            }catch(err){
                console.log("Error en la busqueda del usuario por su id", err);
            }
        }
        searchUser();
    }, [idUser])

    return(
        <div>

        </div>
    )
}

export default Profile;