import React, { useState, useEffect } from "react";
import AccountSettings from "./subComponents/accountSettings";
import SpaceSettings from "./subComponents/spaceSettings";
import "../../../styles/settings.css";


const Settings = ({setChangeSettings, changeSettings, space, userInfo}) => {

    const [setting, setSetting] = useState(1);


    return(
        <div className="settingsSpace">
            <div className="settingSelect">
                <h1>Settings</h1>
                <p className={setting === 1 ? 'selectedSetting' : ''} onClick={()=>setSetting(1)}>Account</p>
                <p className={setting === 2 ? 'selectedSetting' : ''} onClick={()=>setSetting(2)}>Space</p>
            </div>
            {setting === 1 ? (
                <AccountSettings setChangeSettings={setChangeSettings} userInfo={userInfo} changeSettings={changeSettings}/>
            ) : (
                <SpaceSettings setChangeSettings={setChangeSettings} userInfo={userInfo} changeSettings={changeSettings} space={space} />
            )}
        </div>
    )
}

export default Settings;
