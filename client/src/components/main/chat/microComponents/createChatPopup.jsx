import React, { useState, useEffect } from "react";
import "../../../../styles/chat.css";
import { getActiveSpace } from "../../../../utils/getActiveSpace";

const createChatPopup = ({ userId, setDespAdd }) => {
  const [type, setType] = useState(0);
  const [space, setSpace] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [groupName, setGroupName] = useState("");
  const [error,setError] = useState(null);

  const createChat = () => {
    const values = { "name":null, "type":null, "mod_space_id":null, "user_id":userId, "user_id_2":null};
    console.log(type,selectedUser,groupName)
    if(type === 0){
        values.type = type;
        values.user_id_2 = selectedUser;
    }else{
        values.type = type;
        values.name = groupName;
    }

    fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al crear el chat");
          return response.json();
        })
        .then((data) => {
          setDespAdd(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  useEffect(() => {
    const loadSpace = async () => {
      const data = await getActiveSpace();
      setSpace(data);
    };

    loadSpace();
  }, []);

  useEffect(() => {
    if (!space) return;

    fetch(`http://localhost:3000/api/usersSpace/${space.id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los miembros");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [space]);

  return (
    <div className="popupAdd">
      <div className="header-popup">
        <h2>Create a new Chat</h2>
        <button className="btn-close-popup" onClick={() => setDespAdd(false)}>
          ×
        </button>
      </div>
      {type === 0 ? (
        <select
          className="input-email"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
                    <option value={null}></option>

          {members.length < 1 ? (
            <option disabled>No members available</option>
          ) : (
            members.map((member, index) =>
              userId !== member.id ? (
                <option key={index} value={member.id}>
                  {member.email}
                </option>
              ) : null
            )
          )}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Name"
          className="input-email"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      )}
      {
        error && (
            <p className="error">{error}</p>
        )
      }
      <div className="createChatDown">
        <select
          className="input-type"
          onChange={(e) => setType(Number(e.target.value))}
        >
          <option value={0}>Chat</option>
          <option value={1}>Group</option>
        </select>
        <button onClick={() => createChat()}>Create</button>
      </div>
    </div>
  );
};

export default createChatPopup;
