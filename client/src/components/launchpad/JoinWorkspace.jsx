import React, { useState, useEffect } from "react";
import { data, useNavigate } from 'react-router-dom';
import Notifications from "../global/Notifications";
import { getActiveUser } from "../../utils/getActiveUser";

const apiURL = import.meta.env.VITE_API_URL;

const JoinWorkspace = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [code, setCode] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const look = () => {
            if(code === ""){
                const inputCode = document.getElementById("workspace-name-input");
                const errorCode = document.getElementById("error-join-code");
                errorCode.classList.remove("showError");
                inputCode.classList.remove("inputError");
            }
        }
        look();
    }, [code])
    

    useEffect(() => {
        const loadUser = async () => {
            const userData = await getActiveUser();
            if (!userData) {
                navigate("/login");
                return;
            }
            setUser(userData);
        };

        loadUser();
    }, [navigate]);

    const goBack = () => {
        navigate('/launchpad');
    };

    const succes = async () => {
        const inputCode = document.getElementById("workspace-name-input");
        const errorCode = document.getElementById("error-join-code");
        
        if (code.trim() === "") {
            errorCode.textContent = "Please enter a workspace code";
            errorCode.classList.add("showError");
            inputCode.classList.add("inputError");
            return;
        }

        let space = null;

        try {
            const res = await fetch(`${apiURL}/api/space/invitation_code/${code}`);
            const data = await res.json();

            if (!res.ok || !data || data.length === 0) {
                errorCode.textContent = "No workspace found with that code";
                errorCode.classList.add("showError");
                inputCode.classList.add("inputError");
                return;
            }

            errorCode.classList.remove("showError");
            inputCode.classList.remove("inputError");
            space = data[0];

        } catch (err) {
            console.error("Error fetching workspace:", err);
            errorCode.textContent = "Unexpected error while searching for the workspace";
            errorCode.classList.add("showError");
            inputCode.classList.add("inputError");
            return;
        }

        try{
            const resInv = await fetch(`${apiURL}/api/invitations/user_id/${user.id}`);
            if (resInv.ok) {
                const dataInv = await resInv.json();
                const alreadySent = dataInv.some(inv => inv.space_id === space.id);
                if(alreadySent){
                    errorCode.textContent = "Ya se ha mandado la peticion";
                    errorCode.classList.add("showError");
                    inputCode.classList.add("inputError");
                    return;
                }
            }
        }catch(err){
            console.error("Error fetching coincidencia:", err);
        }

        const invitation = {
            userId: user.id,
            spaceId: space.id,
            status: "sended",
            role: "client"
        };

        try {
            const res = await fetch(`${apiURL}/api/invitation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invitation)
            });

            if (res.ok) {
                setNotification({ message: "Join request has been sent successfully", type: "success" });
                inputCode.value = "";
                inputCode.classList.remove("inputError");
            } else {
                setNotification({ message: "Error join request", type: "error" });
            }
        } catch (err) {
            console.error("API connection error:", err);
        }
    };


    return (
        <>
            {notification && (<Notifications message={notification.message} type={notification.type} onClose={() => setNotification(null)} />)}
            <div className="container-joinWorkspace">
                <div id="redonda"></div>

                <div className="div-joinSpace">
                    <button onClick={goBack} className="btn-back">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div className="div-title-space">
                        <h1>Join a workspace</h1>
                    </div>

                    <div className="input-group">
                        <label htmlFor="workspace-name-input">Insert a workspace code</label>
                        <input type="text" id="workspace-name-input" onChange={(e) => setCode(e.target.value)} />
                        <p id="error-join-code" className="error-join-code">Error</p>
                    </div>

                    <button onClick={succes} className="btn-next">Join</button>
                </div>
            </div>
        </>
    );
};

export default JoinWorkspace;
