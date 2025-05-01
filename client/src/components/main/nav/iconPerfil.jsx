import React, { useState, useEffect } from "react";
import '../../../styles/nav.css';
import { getActiveSpace } from "../../../utils/getActiveSpace";

const ProfileIcon = ({ status }) => {
  const tokenSpace = localStorage.getItem("activeSpace");
  const [space, setSpace] = useState(null);

  useEffect(() => {
    const loadSpace = async () => {
      const result = await getActiveSpace();
      setSpace(result);
    }
    loadSpace();
  }, [])


  // if (!space) return null;

  if (status === true) {
    return (
      <button id="btn-profile-expanded">
        <div id="avatar-container-expanded">
          <p id="workspace-letter">{space.name?.charAt(0).toUpperCase()}</p>
        </div>

        {/* Name + dropdown icon */}
        <div id="name-arrow-container">
          <p id="workspace-name" className="fade-text">{space.name.length > 8 ? space.name.slice(0, 8) + "…" : space.name}</p>
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
