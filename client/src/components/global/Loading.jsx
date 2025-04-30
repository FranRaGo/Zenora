import React from "react";

import Logo from "./logo";
import "../../styles/loading.css";

const Loading = () => {
    return(
        <div className="div-container">
            <div id="logo-div-div">
                < Logo />
            </div>
            <div className="flash"></div>
        </div>
    )
}

export default Loading;