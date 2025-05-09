import React, { useState, useEffect, useRef } from "react";
import Profile from "../../../global/profile/profile";
import "../../../../styles/chat.css";

const chatMessages = ({ idUser, activeChat }) => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = () => {
        fetch(`http://localhost:3000/api/messages/${activeChat.chat_id}`)
          .then((res) => res.json())
          .then((data) => {
            setMessages(data);
            setLoadingMessages(false);
          })
          .catch(() => setLoadingMessages(false));
    }

    fetchMessages();

    const interval = setInterval(fetchMessages, 1000);
        
    return () => clearInterval(interval);

  }, [activeChat]);

  if (loadingMessages) return null;

  const reversed = messages.slice().reverse();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid",
    });

  return (
    <div className="messages">
      {reversed.map((msg, i) => {
        const prev = reversed[i - 1];
        const showDate =
          !prev ||
          new Date(msg.date).toDateString() !==
            new Date(prev.date).toDateString();
        const showName = !prev || msg.id !== prev.id;
        const isMine = msg.id === idUser;

        return (
          <React.Fragment key={i}>
            {showDate && <div className="date">{formatDate(msg.date)}</div>}
            {!isMine && showName && activeChat.type === 1 && (
              <div className="userInfoMessage">
                <Profile userId={msg.id} styleCss="profile_icon message-icon" />
                <p className="name">{msg.name}</p>
              </div>
            )}

            <div className={`message ${isMine ? "myMessage" : "otherMessage"}`}>
              <p>{msg.content}</p>
              <p className="messageDate">{formatTime(msg.date)}</p>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default chatMessages;
