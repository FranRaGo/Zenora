import React, { useState, useEffect } from "react";

const ConfirmPopup = ({ text, set, setPopup }) => {
  return (
    <div className="confirmPopup popup-animate">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="alertIconPopup"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      <p>{text}</p>
      <div>
        <button className="cancelPopup" onClick={()=>{setPopup(false)}}>Cancel</button>
        <button className="acceptPopup" onClick={()=>{set(true);setPopup(false)}}>Accept</button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
