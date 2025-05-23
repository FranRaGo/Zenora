import React, { useState, useEffect } from "react";
import ChatBanner from "../microComponents/ChatBanner";
import FilterButtons from "../microComponents/FilterButtons";
import SearchChat from "../microComponents/SearchChat";
import CreateChatButton from "../microComponents/CreateChatButton";
import CreateChatPopup from "../microComponents/CreateChatPopup";

import "../../../../styles/chat.css";

const ChatsPanel = ({
  idUser,
  activeChat,
  setActiveChat,
  chats,
  setChats,
  isMobile,
  setMobileSection,
}) => {
  const [filter, setFilter] = useState(0);
  const [userFilter, setUserFilter] = useState("");
  const [despAdd, setDespAdd] = useState(false);

  return (
    <div className="chatPanel">
      <p className="chatsCount">{"ALL THE CHATS: " + chats.length}</p>
      <div className="searchAdd">
        <SearchChat setUserFilter={setUserFilter} />
        <CreateChatButton setDespAdd={setDespAdd} despAdd={despAdd} />
      </div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <div className="chats">
        {chats.length < 1 ? (
          <p className="secondText">No chats available</p>
        ) : (
          chats.map((chat, index) => (
            <ChatBanner
              chat={chat}
              idUser={idUser}
              setChats={setChats}
              key={index}
              filter={filter}
              userFilter={userFilter}
              setActiveChat={setActiveChat}
              isMobile={isMobile}
              setMobileSection={setMobileSection}
            />
          ))
        )}
      </div>
      {despAdd && <CreateChatPopup userId={idUser} setDespAdd={setDespAdd} />}
    </div>
  );
};

export default ChatsPanel;
