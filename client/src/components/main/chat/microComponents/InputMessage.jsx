import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/chat.css";

const apiURL = import.meta.env.VITE_API_URL;

const InputMessage = ({ idUser, activeChat, answer, setAnswer, messages }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [answerConst, setAnswerConst] = useState(null);

  useEffect(() => {
    if (answer) {
      const foundAnswer = messages.find((msg) => msg.msg_id === answer);
      setAnswerConst(foundAnswer);
    }
  }, [answer, messages]);

  const cancelAnswer = () => {
    console.log('Hola');
    setAnswer(null);
  }

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const sendMessage = () => {
    const formData = new FormData();
    formData.append("chatId", activeChat.chat_id);
    formData.append("userId", idUser);
    formData.append("content", message);
    formData.append("answer", answer || "");

    if (file) {
      formData.append("file", file);
      formData.append("type", file.type);
    } else {
      formData.append("file", "");
      formData.append("type", "");
    }

    fetch(`${apiURL}/api/message`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al crear el chat");
        return response.json();
      })
      .then(() => {
        setMessage("");
        setAnswer(null);
        setFile(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="inputComponent">
      {answer && answerConst && (
        <div className="answerInfo" onClick={cancelAnswer}>
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
          <p>{answerConst.content}</p>
        </div>
      )}
      <div className="inputContainer">
        <svg
          onClick={handleFileClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="file-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
          />
        </svg>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <svg
          onClick={sendMessage}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="send-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default InputMessage;
