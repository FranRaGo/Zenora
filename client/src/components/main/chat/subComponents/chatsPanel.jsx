import React, { useState, useEffect } from "react";
import ChatBanner from "../microComponents/chatBanner";
import "../../../../styles/chat.css";

const ChatsPanel = ({idUser}) => {

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchChats = () => {
        fetch(`http://localhost:3000/api/chats/${idUser}`)
          .then(response => {
            if (!response.ok) throw new Error("Error al obtener los chats");
            return response.json();
          })
          .then(data => {
            setChats(data);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error:", error);
            setLoading(false);
          });
      };
    
      fetchChats();
    
      const interval = setInterval(fetchChats, 3000);
    
      return () => clearInterval(interval);
    }, [idUser]);
  
    if (loading) return <p>Cargando chats...</p>;

    return(
        <div className="chatPanel">
            {
                (chats.length < 1)?(
                    <p>No hay chats disponibles</p>
                ):(
                    chats.map((chat, index) => (
                        < ChatBanner chat={chat} idUser={idUser}/>
                    ))
                )
            }
        </div>
    )
}

export default ChatsPanel;