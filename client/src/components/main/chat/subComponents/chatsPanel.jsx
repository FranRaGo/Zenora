import React, { useState, useEffect, use } from "react";
import ChatBanner from "../microComponents/chatBanner";
import FilterButtons from "../microComponents/filterButtons";
import SearchChat from "../microComponents/searchChat";
import CreateChatButton from "../microComponents/createChatButton";
import CreateChatPopup from "../microComponents/createChatPopup";

import "../../../../styles/chat.css";

const ChatsPanel = ({idUser}) => {

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(0);
    const [userFilter, setUserFilter] = useState('');
    const [despAdd, setDespAdd ] = useState(false);

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
          <div className="searchAdd">
            <SearchChat setUserFilter={setUserFilter}/>
            <CreateChatButton setDespAdd={setDespAdd} despAdd={despAdd}/>
          </div>
          <FilterButtons filter={filter} setFilter={setFilter}/>
          <div className="chats">
            {
              (chats.length < 1)?(
                <p>No hay chats disponibles</p>
              ):(
                chats.map((chat, index) => (
                  < ChatBanner chat={chat} idUser={idUser} setChats={setChats} key={index} filter={filter} userFilter={userFilter}/>
                ))
              )
            }
            </div>
            {
              despAdd && (
                <CreateChatPopup userId={idUser} setDespAdd={setDespAdd}/>
              )
            }
        </div>
    )
}

export default ChatsPanel;