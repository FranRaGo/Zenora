import React, { useState, useEffect } from "react";
import '../../../styles/nav.css';
import { getActiveSpace } from "../../../utils/getActiveSpace";
import SpaceDropdown from "./spaceDropdown";

const ProfileIcon = ({ status, dropdown, setDropdown, setActiveSection}) => {
  const [space, setSpace] = useState(null);

  useEffect(() => {
    const loadSpace = async () => {
      const result = await getActiveSpace();
      setSpace(result);
    }
    loadSpace();
  }, [])

  if (!space) return null;

  const desplegar = () => {
    setDropdown(!dropdown);
  };

  if (status === true) {
    return (
      <div id="btn-profile-expanded" onClick={desplegar}>
        <div id="avatar-container-expanded" style={{ backgroundColor: space.color }} >
          <p id="workspace-name" className="fade-text">
            {space.name?.charAt(0).toUpperCase()}
          </p>
        </div>

        {/* Name + dropdown icon */}
        <div id="name-arrow-container">
          <p id="workspace-name" className="fade-text">
            {space.name.length > 8 ? space.name.slice(0, 8) + "…" : space.name}
          </p>
          <div id="dropdown-icon-expanded">
            {dropdown ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            )}
          </div>
        </div>
        {dropdown && <SpaceDropdown space={space} setActiveSection={setActiveSection}/> }

      </div>
    );
  } else {
    return (
      <div id="btn-profile-collapsed" onClick={desplegar}>
        {/* Just avatar */}
        <div id="avatar-container" style={{ backgroundColor: space.color }}>
          <p id="workspace-letter">{space.name?.charAt(0).toUpperCase()}</p>
        </div>

        {/* Only the dropdown icon */}

        <div id="dropdown-icon">
          {dropdown ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </div>
        {dropdown && <SpaceDropdown space={space} setActiveSection={setActiveSection}/>}

      </div>
    );
  }
};

export default ProfileIcon;
