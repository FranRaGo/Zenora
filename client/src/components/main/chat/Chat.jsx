import React, { useState, useEffect } from "react";

import "../../../styles/chat.css";
import ChatsPanel from "./subComponents/ChatsPanel";
import ChatInfo from "./subComponents/ChatInfo";
import ChatSettings from "./subComponents/ChatSettings";
import useIsMobile from "../../global/useIsMobile";

const Chat = ({ idUser }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [settings, setSettings] = useState(false);
  const [chatForce, setChatForce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileSection, setMobileSection] = useState(1);
  const isMobile = useIsMobile(480);

  useEffect(() => {
    const fetchChats = () => {
      fetch(`http://localhost:3000/api/chats/${idUser}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error al obtener los chats");
          return response.json();
        })
        .then((data) => {
          setChats(data);
          if (
            (!activeChat || !activeChat?.chat_id) &&
            data.length > 0 &&
            !chatForce
          ) {
            setActiveChat(data[0]);
            setChatForce(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    };

    fetchChats();

    const interval = setInterval(fetchChats, 1000);
    return () => clearInterval(interval);
  }, [idUser, activeChat, chatForce, setActiveChat]);

  if (loading) return <p>Loading Chats...</p>;

  if (isMobile) {
    if (mobileSection === 1) {
      return (
        <div className="chatSection">
          <ChatsPanel
            idUser={idUser}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            chats={chats}
            setChats={setChats}
            isMobile={isMobile}
            setMobileSection={setMobileSection}
          />
        </div>
      );
    } else if (mobileSection === 2 && activeChat && activeChat.id && !settings) {
      return (
        <div className="chatSection">
          <ChatInfo
            idUser={idUser}
            activeChat={activeChat}
            setSettings={setSettings}
            settings={settings}
            isMobile={isMobile}
            setMobileSection={setMobileSection}
          />
        </div>
      );
    } else {
      return (
        <ChatSettings
          settings={settings}
          setSettings={setSettings}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          idUser={idUser}
          chats={chats}
          isMobile={isMobile}
        />
      );
    }
  } else {
    return (
      <div className="chatSection">
        <ChatsPanel
          idUser={idUser}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          chats={chats}
          setChats={setChats}
        />
        {activeChat && activeChat.id && (
          <>
            <ChatInfo
              idUser={idUser}
              activeChat={activeChat}
              setSettings={setSettings}
              settings={settings}
            />
            <ChatSettings
              settings={settings}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              idUser={idUser}
              chats={chats}
            />
          </>
        )}
      </div>
    );
  }
};

export default Chat;
