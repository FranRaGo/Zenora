import React, { useState } from "react";

import ChatsPanel from "./subComponents/chatsPanel";

const Chat = ({idUser}) => {
    

    console.log(idUser);

    return(
        <div className="chatSection">
            < ChatsPanel idUser={idUser}/>
        </div>
    )
}

export default Chat;