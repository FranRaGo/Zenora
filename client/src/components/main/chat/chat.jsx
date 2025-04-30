import React, { useState } from "react";

import ChatsPanel from "./subComponents/chatsPanel";

const Chat = ({idUser}) => {
    

    console.log(idUser);

    return(
        <div>
            < ChatsPanel idUser={idUser}/>
        </div>
    )
}

export default Chat;