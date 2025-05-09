import React, { useState, useEffect } from "react";
import ChatHeader from "../microComponents/chatHeader";
import ChatMessages from "../microComponents/chatMessages";
import InputMessage from "../microComponents/inputmessage";
import "../../../../styles/chat.css";

const ChatInfo = ({idUser,activeChat}) => {

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

    return(
        <div className="chatContainer">
            <div className="chatContent">
                <ChatHeader idUser={idUser} activeChat={activeChat}/>
                <ChatMessages idUser={idUser} activeChat={activeChat} />
                <InputMessage idUser={idUser} activeChat={activeChat} />
            </div>  
        </div>
    )
}

export default ChatInfo;