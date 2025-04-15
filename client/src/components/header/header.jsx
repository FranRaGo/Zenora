import React from "react";
import '../../styles/header.css';

const Header = () => {
    return(
        <div id="header">
            <div id="logo">
                <p>Z</p>
            </div>
            <div id="inputBuscar">
                <input type="text" placeholder="Buscar" />
            </div>
            <div className="options">
                <button>subir plan</button>
                <button>+</button>
                <button>8</button>
            </div>
        </div>
    )
}

export default Header;