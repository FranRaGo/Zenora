import React, { useState } from "react";

import useIsMobile from "../../global/useIsMobile";


const Home = () => {
    const isMobile = useIsMobile(480);
    const [dropdown, setDropdown] = useState(false);

    if (isMobile) {
        return (
            <div className="content-container">
                <button className="div-header-home">
                    <h1>EL nombre del espacio</h1>
                </button>
            </div>
        );
    } else {
        return (
            <div className="content-container">
                <div className="div-header-home">
                    <h1>Home</h1>
                </div>
                <h2>estas en el HOMEEEE</h2>
            </div>
        )
    }
}

export default Home;