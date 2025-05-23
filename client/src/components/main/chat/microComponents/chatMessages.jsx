import React, { useState, useEffect, useRef } from "react";
import Profile from "../../../global/profile/Profile";
import "../../../../styles/chat.css";

const ChatMessages = ({ idUser, activeChat, setAnswer, messages }) => {
  const messagesEndRef = useRef(null);

  const handleClick = (msgId) => {
    setAnswer(msgId);
  };

  if (!messages) {
    return null;
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, activeChat]);

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
            {msg.answer &&
              (() => {
                const answeredMsg = messages.find(
                  (m) => m.msg_id === msg.answer
                );
                return (
                  <div className={`answerInfoMessage ${isMine && "myAnswer"}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                      />
                    </svg>
                    <p>
                      {answeredMsg?.name + ": " + answeredMsg?.content ||
                        "Mensaje no disponible"}
                    </p>
                  </div>
                );
              })()}
            {!isMine && showName && activeChat.type === 1 && (
              <div className="userInfoMessage">
                <Profile userId={msg.id} styleCss="profile_icon message-icon" />
                <p className="name">{msg.name}</p>
              </div>
            )}

            <div
              className={`message ${isMine ? "myMessage" : "otherMessage"}`}
              onClick={() => handleClick(msg.msg_id)}
            >
              <p>
                {msg.file && msg.type?.startsWith("image/") && (
                  <img
                    src={`data:${msg.type};base64,${msg.file}`}
                    alt="imagen"
                    className="chat-image"
                  />
                )}
                {msg.content}
              </p>
              <p className="messageDate">{formatTime(msg.date)}</p>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
