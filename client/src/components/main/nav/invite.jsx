import React, { useState, useEffect } from "react";
import { getActiveSpace } from "../../../utils/getActiveSpace";

const Invite = ({ onClose }) => {
    const [space, setSpace] = useState(null);

    useEffect(() => {
        const loadSpace = async () => {
            const res = await getActiveSpace();
            console.log("Respuesta getActiveSpace:", res);
            setSpace(res);
        }

        loadSpace();
    }, [])

    const copyCode = () => {
        navigator.clipboard.writeText(space?.invitation_code);
    }

    return (
        <div className="invite-popup">

            <div className="header-invite">
                <h2>Invite someone to your space</h2>
                <button id="close-invite" className="btn-close" onClick={onClose}>×</button>
            </div>

            <div className="invite-section">
                <label htmlFor="invite-email">Email</label>

                <div className="container-input">
                    <div className="input-email-invite">
                        <input type="email" id="invite-email" name="invite-email" placeholder="Enter email" />
                        <select id="invite-role" name="invite-role">
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                            <option value="client">Client</option>
                        </select>
                    </div>

                    <button id="send-invite" className="btn-send">Send Invite</button>
                </div>

            </div>

            <div className="invite-section">
                <label className="title-share" htmlFor="invitation-code">Share link</label>
                <div className="invitation-code-wrapper">
                    <p>{space?.invitation_code || "Loading..."}</p>
                    <button id="copy-invite-code" className="btn-copy" onClick={copyCode}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                        </svg>
                    </button>
                </div>
                <p className="code-info">You can share this code with someone to let them join your space manually.</p>
            </div>
        </div>

    )
}

export default Invite