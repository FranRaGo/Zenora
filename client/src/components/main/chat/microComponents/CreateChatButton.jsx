import React, { useState, useEffect } from "react";
import "../../../../styles/chat.css";

const createChatButton = ({setDespAdd, despAdd}) => {

    const changeAddPopup = () => {
        setDespAdd(!despAdd);
    }

    return (
        <button className="createButton" onClick={changeAddPopup}>+</button>
    );
}

export default createChatButton;
