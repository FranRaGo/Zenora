import React, { useState, useEffect } from "react";
import "../../../../styles/settings.css";
import Profile from "../../../global/profile/Profile";
import Notifications from "../../../global/Notifications";
import ConfirmPopup from "../../../global/popup/ConfirmPopup";
import { useNavigate } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

const AccountSettings = ({ setChangeSettings, userInfo, changeSettings }) => {
  const [firstName, setFirstName] = useState(userInfo?.first_name || "");
  const [oldToken, setOldToken] = useState(userInfo?.token || "");

  const [lastName, setLastName] = useState(userInfo?.last_name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const [deleteUserConfirm, setDeleteUserConfirm] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const [infoError, setInfoError] = useState("");
  const [passError, setPassError] = useState("");

  const [bannerFileName, setBannerFileName] = useState(
    "Change profile picture"
  );

  const clearBanner = (e) => {
    e.stopPropagation();
    setBannerFileName("Change profile picture");
    document.getElementById("banner").value = "";
  };

  const isImage = (file) => file && file.type.startsWith("image/");

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.first_name || "");
      setLastName(userInfo.last_name || "");
      setEmail(userInfo.email || "");
      setOldToken(userInfo.token || "");
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

  const uploadProfilePicture = async () => {
    if (!selectedBanner) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const fileType = selectedBanner.type;

      try {
        await fetch(`${apiURL}/api/userPhoto/${userInfo.id}`, {
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
    if (deleteUserConfirm) {
      fetch(`${apiURL}/api/user/${userInfo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          let arrayUsers =
            JSON.parse(localStorage.getItem("loggedTokens")) || [];

          arrayUsers = arrayUsers.filter((token) => token !== oldToken);

          localStorage.setItem("loggedTokens", JSON.stringify(arrayUsers));
          localStorage.removeItem("activeToken");

          setDeleteUserConfirm(false);
          navigate("/login");
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [deleteUserConfirm]);

  const handleSave = () => {
    setInfoError("");
    setPassError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setInfoError("All personal info fields must be filled.");
      return;
    }

    const wantsToChangePassword =
      oldPassword || newPassword || repeatNewPassword;

    if (wantsToChangePassword) {
      if (!oldPassword || !newPassword || !repeatNewPassword) {
        setPassError("All password fields must be filled.");
        return;
      }

      if (newPassword !== repeatNewPassword) {
        setPassError("New passwords do not match.");
        return;
      }
    }

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    if (wantsToChangePassword) {
      updatedData.pass = newPassword;
    }

    fetch(`${apiURL}/api/user/${userInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el usuario");
        return res.json(); // 👈 obtener el usuario actualizado del backend
      })
      .then((updatedUser) => {
        localStorage.setItem("activeToken", updatedUser.token);
        let arrayUsers = JSON.parse(localStorage.getItem("loggedTokens"));

        arrayUsers = arrayUsers.map((token) =>
          token === oldToken ? updatedUser.token : token
        );

        localStorage.setItem("loggedTokens", JSON.stringify(arrayUsers));

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
          <h2>Personal Information</h2>
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
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={firstName}
                  className="inputSetting"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="inputDisplaySettings">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  className="inputSetting"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDisplaySettings">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                className="inputSetting"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {infoError !== "" && <p className="errorSettings">{infoError}</p>}
        </div>

        <div className="settingSection">
          <h2>Change Password</h2>
          <div className="sectionChanges">
            <div className="settingSubSecction">
              <div className="inputDisplaySettings">
                <label htmlFor="newPassword">Old Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="inputSetting"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="inputDisplaySettings">
                <label htmlFor="oldPassword">New Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  className="inputSetting"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="inputDisplaySettings">
                <label htmlFor="repOldPassword">Repeat New Password</label>
                <input
                  type="password"
                  id="repOldPassword"
                  className="inputSetting"
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          {passError !== "" && <p className="errorSettings">{passError}</p>}
        </div>

        <div className="settingsButtons">
          <button onClick={handleSave}>Save changes</button>
          <button className="red" onClick={() => setPopupDelete(true)}>
            Delete Account
          </button>
        </div>
      </div>
      {popupDelete && (
        <ConfirmPopup
          text={"Are you sure you want to delete this user?"}
          set={setDeleteUserConfirm}
          setPopup={setPopupDelete}
        />
      )}
    </>
  );
};

export default AccountSettings;
