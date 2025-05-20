import React, { useState, useEffect } from "react";
import "../../../../styles/settings.css";
import Profile from "../../../global/profile/profile";
import Notifications from "../../../global/notifications";
import ConfirmPopup from "../../../global/popup/ConfirmPopup";

const SpaceSettings = ({ setChangeSettings, userInfo, changeSettings, space }) => {
  const [name, setName] = useState(userInfo?.name || "");


  const [selectedBanner, setSelectedBanner] = useState(null);
  const [notification, setNotification] = useState(null);

const [deleteSpaceConfirm, setDeleteSpaceConfirm] = useState(null);
const [popupDelete, setPopupDelete] = useState(null);

  const [spaceError, setSpaceError] = useState("");

  const [bannerFileName, setBannerFileName] = useState(
    "Change logo space"
  );

  const clearBanner = (e) => {
    e.stopPropagation();
    setBannerFileName("Change profile picture");
    document.getElementById("banner").value = "";
  };

  const isImage = (file) => file && file.type.startsWith("image/");

  useEffect(() => {
    if (space) {
      setName(space.name || "");
      
    }
  }, [space]);

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

  const uploadProfilePicture = async () => {
    if (!selectedBanner) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const fileType = selectedBanner.type;

      try {
        await fetch(`http://localhost:3000/api/userPhoto/${userInfo.id}`, {
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
      setBannerFileName("Change profile picture");
    };

    reader.readAsDataURL(selectedBanner);
  };

   useEffect(() => {
      if (deleteSpaceConfirm) {
        fetch(
          `http://localhost:3000/api/user/${userInfo.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(() => {
            setDeleteSpaceConfirm(false);
          })
          .catch((er) => {
            setError(er.message || "Unexpected error");
          });
      }
    }, [deleteSpaceConfirm]);

  const handleSave = () => {
    setSpaceError("");
    
/*
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setSpaceError("All personal info fields must be filled.");
      return;
    }

  

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    if (wantsToChangePassword) {
      updatedData.pass = newPassword;
    }

    fetch(`http://localhost:3000/api/user/${userInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        if (selectedBanner) {
          return uploadProfilePicture();
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
      */
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
              <Profile userId={userInfo?.id} styleCss={"profile_icon"} />
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
                />
              </div>
            </div>
          </div>
          {spaceError !== "" && <p className="errorSettings">{spaceError}</p>}
        </div>

       
        <div className="settingsButtons">
          <button onClick={handleSave}>Save changes</button>
          <button className="red" onClick={()=>setPopupDelete(true)}>Delete Space</button>
        </div>
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
