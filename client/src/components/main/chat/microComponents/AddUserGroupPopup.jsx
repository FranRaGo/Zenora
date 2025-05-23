import React, { useState, useEffect } from "react";
import { getActiveSpace } from "../../../../utils/getActiveSpace";

const apiURL = import.meta.env.VITE_API_URL;

const AddUserGroupPopup = ({ chatId, userId, setPopup }) => {
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [space, setSpace] = useState(null);
  const [error, setError] = useState(null);

  const assigChat = () => {
    let localError = null;
    setError(null);

    const values = {
      userId: null,
      chatId: chatId,
    };

    if (selectedUser === "") {
      localError = "User is required";
    } else {
      values.userId = selectedUser;
    }

    if (localError) {
      setError(localError);
      return;
    }

    fetch(`${apiURL}/api/userChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al asignar el chat");
        return response.json();
      })
      .then(() => {
        setPopup(false);
      })
      .catch((er) => {
        console.log(error);
        setError(er.message || "Unexpected error");
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

    fetch(`${apiURL}/api/usersSpace/${space.id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los miembros");
        return response.json();
      })
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [space]);

  return (
    <div className="popupAdd popup-animate">
      <div className="header-popup">
        <h2>Add user to chat</h2>
        <button className="btn-close-popup" onClick={() => setPopup(false)}>
          ×
        </button>
      </div>
      <div className="button-popup">
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
        <button onClick={assigChat}>Add</button>
      </div>
            {error && <p className="error-popup-chat">{error}</p>}

    </div>
  );
};

export default AddUserGroupPopup;
