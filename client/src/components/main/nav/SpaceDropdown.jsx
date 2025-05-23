import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../utils/useClickOutside";
import SpaceIcon from "../../global/profile/SpaceIcon";

const SpaceDropdown = ({ space, setActiveSection, closeDiv }) => {
  const navigate = useNavigate();
  const ref = useRef();
  useClickOutside(ref, closeDiv);

  return (
    <div className="dropdown-space">
      <div id="btn-profile-expanded">
        <SpaceIcon spaceId={space.id} styleCss={"profile_icon"} />

        {/* Name + dropdown icon */}
        <div id="name-arrow-container">
          <p id="workspace-name" className="fade-text">
            {space.name.length > 8 ? space.name.slice(0, 8) + "…" : space.name}
          </p>
        </div>
      </div>

      <div className="options-space-div">
        <button onClick={() => setActiveSection("settings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
          <p>Settings</p>
        </button>
        <button onClick={() => navigate("/launchpad")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
          <p>Launch pad</p>
        </button>
        <button onClick={() => setActiveSection("changePlan")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
          <p>Update plan</p>
        </button>
      </div>
    </div>
  );
};

export default SpaceDropdown;
