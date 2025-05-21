import React, { useState, useEffect } from "react";
import "../../../../styles/settings.css";
import SpaceIcon from "../../../global/profile/spaceIcon";
import Notifications from "../../../global/notifications";
import ConfirmPopup from "../../../global/popup/ConfirmPopup";
import { useNavigate } from "react-router-dom";

const SpaceSettings = ({
  setChangeSettings,
  userInfo,
  changeSettings,
  space,
}) => {
  const [name, setName] = useState(userInfo?.name || "");
  const [role, setRole] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const [deleteSpaceConfirm, setDeleteSpaceConfirm] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);

  const [spaceError, setSpaceError] = useState("");

  const [bannerFileName, setBannerFileName] = useState("Change logo space");

  const clearBanner = (e) => {
    e.stopPropagation();
    setBannerFileName("Change space logo");
    document.getElementById("banner").value = "";
  };

  const isImage = (file) => file && file.type.startsWith("image/");

  useEffect(() => {
    if (space) {
      setName(space.name || "");
    }
  }, [space]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && space) {
      fetch(
        `http://localhost:3000/api/userSpaceRole/${userInfo.id}/${space.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setRole(data[0].role);
        })
        .catch((er) => {
          console.log(er.message || "Unexpected error");
        });
    }
  }, [userInfo]);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!isImage(file)) {
      alert("File must be an image");
      e.target.value = "";
      return;
    }

    const shortName =
      file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
    setBannerFileName(shortName);
    setSelectedBanner(file);
  };

  const uploadSpaceLogo = async () => {
    if (!selectedBanner) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const fileType = selectedBanner.type;

      try {
        await fetch(`http://localhost:3000/api/updateSpaceLogo/${space.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64,
            file_type: fileType,
          }),
        });
      } catch (err) {
        console.error("Error al subir la foto de perfil:", err);
      }

      setSelectedBanner(null);
      setBannerFileName("Change space logo");
    };

    reader.readAsDataURL(selectedBanner);
  };

  useEffect(() => {
    if (deleteSpaceConfirm) {
      fetch(`http://localhost:3000/api/deleteSpace/${space.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          localStorage.removeItem("activeSpace");
          setDeleteSpaceConfirm(false);
          navigate("/launchpad");
        })
        .catch((er) => {
          console.log(er.message || "Unexpected error");
        });
    }
  }, [deleteSpaceConfirm]);

  const handleSave = () => {
    setSpaceError("");

    if (!name.trim()) {
      setSpaceError("Name of space is required.");
      return;
    }

    const updatedData = {
      name: name,
    };

    fetch(`http://localhost:3000/api/updateSpaceName/${space.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        if (selectedBanner) {
          return uploadSpaceLogo();
        }
      })
      .then(() => {
        setChangeSettings(!changeSettings);
        setNotification({
          message: "Changes applied correctly",
          type: "success",
        });
      })
      .catch((er) => {
        console.log(er.message || "Unexpected error");
      });
  };
  return (
    <>
      {notification && (
        <Notifications
          message={notification?.message}
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="settings">
        <div className="settingSection">
          <h2>Space Information</h2>
          <div className="sectionChanges">
            <div className="settingSubSecction">
              <SpaceIcon spaceId={space?.id} styleCss={"profile_icon"} />
              <div className="banner-upload">
                <label htmlFor="banner" className="banner-label-wrapper">
                  <span className="banner-label">{bannerFileName}</span>
                  {bannerFileName !== "Choose a banner" && (
                    <button className="btn-clear-banner" onClick={clearBanner}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        width="14"
                        height="14"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </label>
                <input
                  type="file"
                  name="banner"
                  id="banner"
                  className="input-file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  hidden
                />
              </div>
            </div>
            <div className="settingSubSecction">
              <div className="inputDisplaySettings">
                <label htmlFor="name">Space Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  className="inputSetting"
                  onChange={(e) => setName(e.target.value)}
                  disabled={role !== "admin"}
                />
              </div>
            </div>
          </div>
          {spaceError !== "" && <p className="errorSettings">{spaceError}</p>}
        </div>
        {role === "admin" && (
          <div className="settingsButtons">
            <button onClick={handleSave}>Save changes</button>
            <button className="red" onClick={() => setPopupDelete(true)}>
              Delete Space
            </button>
          </div>
        )}
      </div>
      {popupDelete && (
        <ConfirmPopup
          text={"Are you sure you want to delete this Space?"}
          set={setDeleteSpaceConfirm}
          setPopup={setPopupDelete}
        />
      )}
    </>
  );
};

export default SpaceSettings;
