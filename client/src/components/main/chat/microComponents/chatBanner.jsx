import React, { useState, useEffect } from "react";


const ChatBanner = ({chat,idUser}) => {

    const [members,setMembers] = useState([])
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/chatMembers/${idUser}/${chat.chat_id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los miembros");
            return response.json();
        })
        .then(data => {
            setMembers(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error:", error);
            setLoading(false);
        });
    }, [idUser]);

    return(
      <div className="chatBanner">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <p>{members[0]?.name || "Sin nombre"}</p>
        )}
      </div>
    )
}

export default ChatBanner;