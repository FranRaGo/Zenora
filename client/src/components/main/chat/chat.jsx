import React, { act, useState } from "react";

import "../../../styles/chat.css";
import ChatsPanel from "./subComponents/chatsPanel";
import ChatInfo from "./subComponents/chatInfo";

const Chat = ({idUser}) => {

    const [activeChat,setActiveChat] = useState({});
    
    return(
        <div className="chatSection">
            <ChatsPanel idUser={idUser} setActiveChat={setActiveChat}/>
            {
                activeChat.id && (
                    <ChatInfo idUser={idUser} activeChat={activeChat}/>
                )
            }
        </div>
    )
}

export default Chat;