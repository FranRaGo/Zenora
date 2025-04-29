import React, { useState, useEffect } from "react";
import '../../../styles/header.css';
import Logo from '../../global/logo';
import useIsMobile from "../../global/useIsMobile";

const Header = () => {
    const isMobile = useIsMobile(480);
    const emailUser = localStorage.getItem("activeLog") || '';
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try{    
                const res = await fetch(`http://localhost:3000/api/usersFilter/email/${emailUser}`);
                if(res.ok){
                    const resData = await res.json();
                    setUserData(resData[0]);
                }
            }catch(err){
                console.log("Error, cant get user", err);
            }
        }

        getUser();
    },[emailUser])

    if (isMobile) {
        return (
            <div id="header-container-mobil">
                <button id="menuDesplegable">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>
            </div>
        );
    } else {
        return (
            <div id="header-container">
                <div id="logo">
                    < Logo />
                </div>
                <div className="header-search">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text" placeholder="Buscar" id="inputSearch" className="input-search" />
                </div>
                <div className="header-actions">

                    <button className="btn-upload-plan">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        <p>Update plan</p></button>

                    <button id="btn-add-options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="2" y="2" width="5" height="5" rx="1.5" />
                            <rect x="9.5" y="2" width="5" height="5" rx="1.5" />
                            <rect x="17" y="2" width="5" height="5" rx="1.5" />
                            <rect x="2" y="9.5" width="5" height="5" rx="1.5" />
                            <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" />
                            <rect x="17" y="9.5" width="5" height="5" rx="1.5" />
                            <rect x="2" y="17" width="5" height="5" rx="1.5" />
                            <rect x="9.5" y="17" width="5" height="5" rx="1.5" />
                            <rect x="17" y="17" width="5" height="5" rx="1.5" />
                        </svg>
                    </button>

                    <button className="btn-user-options">88</button>
                </div>
            </div>
        )
    }
}

export default Header;