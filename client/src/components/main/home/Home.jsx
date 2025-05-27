import React, { useState } from "react";

import useIsMobile from "../../global/useIsMobile";


const Home = ({ user }) => {
    const isMobile = useIsMobile(480);
    const [dropdown, setDropdown] = useState(false);

    if (isMobile) {
        return (
            <div className="content-container">
                <button className="div-header-home">
                    <p>{user.first_name}</p>
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
                 <p>{user.first_name}</p>
                <h2>estas en el HOMEEEE</h2>
            </div>
        )
    }
}

export default Home;
