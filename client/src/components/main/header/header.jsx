import React from "react";
import '../../../styles/header.css';
import Logo from '../../global/logo';

const Header = () => {
    return(
        <div id="header">
            <div id="logo">
                < Logo />
            </div>
            <div id="divSearch">
                <input type="text" placeholder="Buscar" id="inputSearch"/>
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