import React, { useEffect, useState } from "react";
import "../../styles/global.css";


const Notifications = ({ message, type, onClose, duration = 4000}) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true);
            setTimeout(onClose, 400);
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration])

    const manualClose = () => {
        setClosing(true);
        setTimeout(onClose, 400);
    };

    return (
        <div className={`notify ${type} ${closing ? "hide" : ""}`}>
            <p>{message}</p>
            <button className="close-btn" onClick={manualClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default Notifications;