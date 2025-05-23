import React, { useState, useEffect } from "react";
import Profile from "../../../global/profile/Profile";
import ConfirmPopup from "../../../global/popup/ConfirmPopup";
import AddUserGroupPopup from "../microComponents/addUserGroupPopup";
import Notifications from "../../../global/Notifications";

const ChatSettings = ({
  settings,
  setSettings,
  activeChat,
  idUser,
  setActiveChat,
  chats,
  isMobile,
}) => {
  const [notification, setNotification] = useState(null);

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const [popupDelete, setPopupDelete] = useState(false);
  const [deleteChatConfirm, setDeleteChatConfirm] = useState(null);

  const [popupLeave, setPopupLeave] = useState(false);
  const [leaveChatConfirm, setLeaveChatConfirm] = useState(null);

  const [popupLeaveUser, setPopupLeaveUser] = useState(false);
  const [leaveUserConfirm, setLeaveUserConfirm] = useState(null);
  const [leaveUser, setLeaveUser] = useState(null);

  const [popupAddMember, setPopupAddMember] = useState(false);

  const [values, setValues] = useState({
    userId: idUser,
    chatId: activeChat.chat_id,
  });

  useEffect(() => {
    setValues({
      userId: idUser,
      chatId: activeChat.chat_id,
    });
  }, [activeChat.chat_id, idUser]);

  useEffect(() => {
    if (deleteChatConfirm) {
      fetch(`http://localhost:3000/api/chat/${activeChat.chat_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          const updatedChats = chats.filter(
            (chat) => chat.chat_id !== activeChat.chat_id
          );
          setDeleteChatConfirm(false);
          setActiveChat(updatedChats[0] || null);
          setNotification({
            message: "Chat deleted successfully",
            type: "success",
          });
          setTimeout(() => setNotification(null), 2000);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [deleteChatConfirm]);

  useEffect(() => {
    if (leaveUserConfirm) {
      const body = {
        userId: leaveUser,
        chatId: activeChat.chat_id,
      };

      fetch(`http://localhost:3000/api/userChat`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          setMembers((prev) => prev.filter((u) => u.id !== leaveUserConfirm));
          setLeaveUserConfirm(null);
          setNotification({
            message: "User successfully deleted",
            type: "success",
          });
          setTimeout(() => setNotification(null), 2000);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [leaveUserConfirm]);

  useEffect(() => {
    if (leaveChatConfirm) {
      fetch(`http://localhost:3000/api/userChat`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(() => {
          const updatedChats = chats.filter(
            (chat) => chat.chat_id !== activeChat.chat_id
          );
          setLeaveChatConfirm(false);
          setActiveChat(updatedChats[0] || null);
          setNotification({
            message: "You have successfully left the chat",
            type: "success",
          });
          setTimeout(() => setNotification(null), 2000);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [leaveChatConfirm]);

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
      .catch((error) => {});
  }, [activeChat.chat_id, popupAddMember, leaveUserConfirm]);

  if (settings) {
    return (
      <>
        {notification && (
          <Notifications
            message={notification?.message}
            type={notification?.type}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="chatSettings">
          {isMobile && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="backChatIcon"
              onClick={() => setSettings(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          )}
          <div className="settingsHeader">
            {!loadingMembers && activeChat.type === 0 && (
              <Profile
                userId={members[0]?.id}
                styleCss={"profile_icon iconSetHead"}
              />
            )}
            {loadingMembers ? (
              <p className="notFound">Loading...</p>
            ) : activeChat.type !== 0 ? (
              <>
                <p className="chatSetTitle">
                  {activeChat.name || "Sin nombre"}
                </p>
                <p className="groupCount">
                  Group · {members.length + 1} members
                </p>
              </>
            ) : members.length === 0 ? (
              <p className="notFound">There are no members</p>
            ) : (
              <div>
                <p className="chatSetTitle">
                  {members[0]?.name || "Sin nombre"}
                </p>
                <p className="memberGmail">
                  {members[0]?.email || "Sin nombre"}
                </p>
              </div>
            )}
            {!loadingMembers && members.admin === 1 && (
              <p className="adminStiker">Admin</p>
            )}
          </div>
          {!loadingMembers && activeChat.type === 1 && (
            <div className="membersList">
              {members.length > 0 ? (
                members.map((member) => (
                  <div key={member.id} className="memberItem">
                    <Profile userId={member.id} styleCss="profile_icon" />
                    <div className="userInfo">
                      <p className="memberName">{member.name}</p>
                      <p className="memberGmail">{member.email}</p>
                    </div>
                    {member.admin === 1 && (
                      <span className="adminStiker">Admin</span>
                    )}
                    {activeChat.admin === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        value={member.id}
                        onClick={(e) => {
                          setPopupLeaveUser(true);
                          setLeaveUser(member.id);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    )}
                  </div>
                ))
              ) : (
                <p className="notFound">
                  There are no more members in this group
                </p>
              )}
            </div>
          )}
          <div className="chatActions">
            <div
              className="alertChatAction"
              onClick={() => {
                setPopupLeave(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="alertChatAction"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              <p> Leave chat</p>
            </div>
            {activeChat.admin && (
              <>
                <div
                  className="alertChatAction"
                  onClick={() => {
                    setPopupDelete(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="alertChatAction"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  <p> Delete chat</p>
                </div>
                {activeChat.type === 1 && (
                  <div onClick={() => setPopupAddMember(true)}>
                    <svg
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <p> Add member</p>
                  </div>
                )}
              </>
            )}
          </div>
          {popupDelete && (
            <ConfirmPopup
              text={"Are you sure you want to delete the chat?"}
              set={setDeleteChatConfirm}
              setPopup={setPopupDelete}
            />
          )}
          {popupLeave && (
            <ConfirmPopup
              text={"Are you sure you want to leave the chat?"}
              set={setLeaveChatConfirm}
              setPopup={setPopupLeave}
            />
          )}
          {popupLeaveUser && (
            <ConfirmPopup
              text={"Are you sure you want to ban the user?"}
              set={setLeaveUserConfirm}
              setPopup={setPopupLeaveUser}
            />
          )}
          {popupAddMember && (
            <AddUserGroupPopup
              setPopup={setPopupAddMember}
              chatId={activeChat.chat_id}
              userId={idUser}
            />
          )}
        </div>
      </>
    );
  }
};

export default ChatSettings;
