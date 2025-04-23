import React, { useState } from "react";
import '../../../styles/nav.css';

const ProfileIcon = ({ status }) => {
  const [name, setName] = useState('My space');

  if (status === true) {
    return (
      <button id="btn-profile-expanded">
        {/* Avatar container: either image or first letter */}
        <div id="avatar-container-expanded">
          <p id="workspace-letter">M</p>
        </div>

        {/* Name + dropdown icon */}
        <div id="name-arrow-container">
          <p id="workspace-name" className="fade-text">{name.length > 8 ? name.slice(0, 8) + "…" : name}</p>
          <div id="dropdown-icon-expanded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </button>
    );
  } else {
    return (
      <button id="btn-profile-collapsed">
        {/* Just avatar */}
        <div id="avatar-container">
          <p id="workspace-letter">M</p>
        </div>

        {/* Only the dropdown icon */}
        <div id="dropdown-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>
    );
  }
};

export default ProfileIcon;
