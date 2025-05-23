import React, { useState, useEffect } from "react";
import Profile from "../../../global/profile/Profile";

const apiURL = import.meta.env.VITE_API_URL;

const ChatBanner = ({
  chat,
  idUser,
  filter,
  userFilter,
  setActiveChat,
  isMobile, setMobileSection
}) => {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [isImportant, setIsImportant] = useState(chat.important);

  useEffect(() => {
  setIsImportant(chat.important);
}, [chat]);


  const changeChats = (id) => {
    setActiveChat(chat);
    if(isMobile){
      setMobileSection(2);
    }
  };

  useEffect(() => {
    fetch(`${apiURL}/api/chatMembers/${idUser}/${chat.chat_id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los miembros");
        return response.json();
      })
      .then((data) => {
        setMembers(data);
        setLoadingMembers(false);
      })
      .catch((error) => {
        setLoadingMembers(false);
      });
  }, [idUser, message]);

  useEffect(() => {
    fetch(`${apiURL}/api/messages/${chat.chat_id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los chats");
        return response.json();
      })
      .then((data) => {
        setMessage(data);
        setLoadingMessage(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingMessage(false);
      });
  }, [chat]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      });
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "Europe/Madrid",
      });
    }
  };

  const setImportant = (id, important) => {
    fetch(`${apiURL}/api/important`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ important, chatUsId: id }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Error al actualizar el estado importante");
        return response.json();
      })
      .then((data) => {
        setIsImportant(important);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  if (
    (filter === 1 && chat.type !== 0) ||
    (filter === 2 && chat.type === 0) ||
    (filter === 3 && chat.important === 0) ||
    (userFilter !== "" &&
      !members.some((member) =>
        member.name.toLowerCase().includes(userFilter.toLowerCase())
      ) &&
      !(chat.name || "").toLowerCase().includes(userFilter.toLowerCase()))
  ) {
    return null;
  }

  return (
    <div className="chatBanner" onClick={() => changeChats(chat.chat_id)}>
      <div className="chatRight">
        {!loadingMembers && chat.type === 0 && (
          <Profile userId={members[0]?.id} styleCss={"profile_icon"} />
        )}
        <div className="chatInfo">
          {loadingMembers ? (
            <p className="secondText">Loading...</p>
          ) : chat.type !== 0 ? (
            <div className="chatGroup">
              <p className="chatName">{chat.name || "Sin nombre"}</p>
              <p className="chatType">Group</p>
            </div>
          ) : members.length === 0 ? (
            <p className="secondText">No members</p>
          ) : (
            <p className="chatName">{members[0]?.name || "Sin nombre"}</p>
          )}
          {loadingMessage ? (
            <p className="secondText">Loading...</p>
          ) : message.length === 0 ? (
            <p className="l-message hidden">.</p>
          ) : (
            <p className="l-message">{message[0]?.content}</p>
          )}
        </div>
      </div>
      <div className="chatLeft">
        {message.length !== 0 && (
          <p className="hora">{formatDate(message[0]?.date)}</p>
        )}
        {isImportant === 0 ? (
          <svg
            onClick={() => setImportant(chat.id, 1)}
            width="25"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setImportant(chat.id, 0)}
            width="25"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ChatBanner;
