import React, { useState, useEffect } from "react";
import Profile from "../../../global/profile/Profile";
import "../../../../styles/chat.css";

const chatHeader = ({
  idUser,
  activeChat,
  setSettings,
  settings,
  isMobile,
  setMobileSection,
}) => {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const displaySettings = () => {
    setSettings(!settings);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/chatMembers/${idUser}/${activeChat.chat_id}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los miembros");
        return response.json();
      })
      .then((data) => {
        setMembers(data);
        setLoadingMembers(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingMembers(false);
      });
  }, [idUser, activeChat]);

  if (loadingMembers) {
    return null;
  }

  return (
    <div className="chatHeader">
      <div>
        {isMobile && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="backChatIcon"
            onClick={() => setMobileSection(1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        )}
        <div>
          {!loadingMembers && activeChat.type === 0 && members[0]?.id && (
            <Profile userId={members[0].id} styleCss={"profile_icon"} />
          )}
        </div>
        {!loadingMembers && activeChat.type !== 0 ? (
          <p
            className="chatTitle"
            onClick={isMobile ? displaySettings : undefined}
          >
            {activeChat.name || "Sin nombre"}
          </p>
        ) : members.length === 0 ? (
          <p>No hay miembros</p>
        ) : (
          <p
            className="chatTitle"
            onClick={isMobile ? displaySettings : undefined}
          >
            {members[0]?.name || "Sin nombre"}
          </p>
        )}
      </div>
      {!isMobile && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={displaySettings}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16"
          />
        </svg>
      )}
    </div>
  );
};

export default chatHeader;
