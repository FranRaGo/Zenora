import React, { useState, useEffect, useRef } from "react";
import { getActiveSpace } from "../../../utils/getActiveSpace";
import Notification from "../../global/Notifications";
import useClickOutside from "../../../utils/useClickOutside";

const Invite = ({ onClose, clickOut }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [space, setSpace] = useState(null);
    const [value, setValue] = useState("client");
    const [notification, setNotification] = useState(null);
    const [copied, setCopied] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const ref = useRef();
    useClickOutside(ref, onClose);
    
    /*Recoje el espacio activo */
    useEffect(() => {
        const loadSpace = async () => {
            const space = await getActiveSpace();
            setSpace(space);
        }
        loadSpace();
    }, [])

    /*Pone el codigo del espacio en el portapapeles */
    const copyCode = () => {
        navigator.clipboard.writeText(space?.invitation_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    useEffect(() => {
        if (!space?.id) return;

        const loadUsers = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/usersSpace/${space.id}`);
                if (res.ok) {
                    const dataSpace = await res.json();
                    setUsers(dataSpace);
                }
            } catch (err) {
                console.error("Error cargando usuarios del espacio:", err);
            }
        };

        loadUsers();
    }, [space?.id]);

    /*Validamos el correo */
    const validateEmail = async (e) => {
        const errorEmail = document.getElementById("errorEmail");
        const inputInvite = document.querySelector(".input-email-invite");
        const value = e.currentTarget.value;
        try {
            const res = await fetch(`http://localhost:3000/api/usersFilter/email/${value}`);
            if (res.ok) {
                const data = await res.json();
                const foundUser = data[0];
                setUser(foundUser);
                errorEmail.textContent = "";
                setIsValidEmail(true);
                inputInvite.classList.remove("inputError");

                const yaEnEspacio = users?.some(us => us.id === foundUser.id);
                if (yaEnEspacio) {
                    errorEmail.textContent = "This user is already part of your space";
                    setIsValidEmail(false);
                    inputInvite.classList.add("inputError");
                }

                const resInv = await fetch(`http://localhost:3000/api/invitations/user_id/${foundUser.id}`);
                if (resInv.ok) {
                    const dataInv = await resInv.json();
                    const pendingInvite = dataInv.find(inv => inv.space_id === space.id && inv.status === "invited");
                    if (pendingInvite) {
                        errorEmail.textContent = "This user has already been invited to your space";
                        setIsValidEmail(false);
                        inputInvite.classList.add("inputError");
                    }
                }

            } else {
                setUser(null);
                errorEmail.textContent = "No user found with this email";
                setIsValidEmail(false);
                inputInvite.classList.add("inputError");
            }



        } catch (err) {
            console.error("Error recogiendo el usuario:", err);
        }
    }

    /*Creamos la invitacion */
    const sendInvitatio = async () => {
        let inputEmail = document.getElementById("invite-email");
        let inputRole = document.getElementById("invite-role").value;
        const inputInvite = document.querySelector(".input-email-invite");
        inputInvite.classList.remove("inputError");


        if (inputEmail.value === "") {
            document.getElementById("errorEmail").textContent = "Please enter an email address";
            inputInvite.classList.add("inputError");
            return;
        }

        if (!user || !user.id || !space || !space.id) {
            console.error("Missing data to send the invitation");
            return;
        }

        if (!isValidEmail) {
            document.getElementById("errorEmail").textContent = "You can't send an invite until the email is valid";
            inputInvite.classList.add("inputError");
            return;
        }

        const invitation = {
            userId: user.id,
            spaceId: space.id,
            status: "invited",
            role: inputRole
        };

        try {
            const response = await fetch('http://localhost:3000/api/invitation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invitation)
            });
            if (response.ok) {
                setNotification({ message: "Invitation sent successfully", type: "success" })
                inputEmail.value = "";
                setUser(null);
                inputInvite.classList.remove("inputError");

            } else {
                setNotification({ message: "Error sending invitation", type: "error" })
            }
        } catch (err) {
            console.error("Error conecting with API:", err);
        }

    }

    return (
        <>
            {notification && (<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
            <div className="invite-popup popup-animate" ref={ref}>

                <div className="header-invite">
                    <h2>Invite someone to your space</h2>
                    <button id="close-invite" className="btn-close" onClick={onClose}>×</button>
                </div>

                <div className="invite-section">
                    <label htmlFor="invite-email">Email</label>

                    <div className="container-input">
                        <div className="input-email-invite">
                            <input type="email" id="invite-email" name="invite-email" placeholder="example@gmail.com" onChange={(e) => validateEmail(e)} />
                            <select id="invite-role" name="invite-role" value={value} onChange={(e) => setValue(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="client">Client</option>
                            </select>
                        </div>

                        <button id="send-invite" className="btn-send" onClick={sendInvitatio}>Send Invite</button>
                    </div>

                    <p id="errorEmail"></p>

                </div>

                <div className="invite-section">
                    <label className="title-share" htmlFor="invitation-code">Share link</label>
                    <div className="invitation-code-wrapper">
                        <p>{space?.invitation_code || "Loading..."}</p>
                        <div className="copy-wrapper">
                            {copied && <div className="copied-popup">Copied!!</div>}
                            <button id="copy-invite-code" className="btn-copy" onClick={copyCode}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className="code-info">You can share this code with someone to let them join your space manually.</p>
                </div>
            </div>
        </>

    )
}

export default Invite