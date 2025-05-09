import React, { useState, useEffect } from "react";
import "../../../../styles/chat.css";

const inputMessage = ({idUser, activeChat }) => {

    const [message, setMessage] = useState('');
    console.log(activeChat)
    const values = {
        chatId: activeChat.chat_id,
        userId: idUser,
        content: message,
        answer: null,
        file: null,
      };

    const sendMessage = () => {
        fetch("http://localhost:3000/api/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              if (!response.ok) throw new Error("Error al crear el chat");
              return response.json();
            })
            .then(() => {
                setMessage("");
              })
            .catch((er) => {
              setError(er.message || "Unexpected error");
            });
    }

    return (
        <div className="inputContainer">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="send-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
        </div>
    );
}

export default inputMessage;