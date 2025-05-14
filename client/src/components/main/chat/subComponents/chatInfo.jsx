import React, { useState, useEffect } from "react";
import ChatHeader from "../microComponents/chatHeader";
import ChatMessages from "../microComponents/chatMessages";
import InputMessage from "../microComponents/inputmessage";
import "../../../../styles/chat.css";

const ChatInfo = ({ idUser, activeChat }) => {
  const [answer, setAnswer] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = () => {
      fetch(`http://localhost:3000/api/messages/${activeChat.chat_id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        });
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [activeChat]);

  return (
    <div className="chatContainer">
      <div className="chatContent">
        <ChatHeader idUser={idUser} activeChat={activeChat} />
        <ChatMessages
          idUser={idUser}
          activeChat={activeChat}
          setAnswer={setAnswer}
          messages={messages}
        />
        <InputMessage
          idUser={idUser}
          activeChat={activeChat}
          setAnswer={setAnswer}
          answer={answer}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default ChatInfo;
