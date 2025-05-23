import React, { useState, useEffect } from "react";
import "../../../../styles/chat.css";

const filterButtons = ({filter, setFilter}) => {

    const filterChats = (value) => {
        setFilter(value);
    }

    return (
        <div className="filterButtons">
            <button className={filter === 0 ? "activeFilter" : ""} onClick={()=>filterChats(0)}>All</button>
            <button className={filter === 1 ? "activeFilter" : ""} onClick={()=>filterChats(1)}>Chat</button>
            <button className={filter === 2 ? "activeFilter" : ""} onClick={()=>filterChats(2)}>Group</button>
            <button className={filter === 3 ? "activeFilter" : ""} onClick={()=>filterChats(3)}>Favorites</button>
        </div>
    );
}

export default filterButtons;