import React, { useRef, useState } from "react";
import '../../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';


const ValidateSignup = ({ user, goBack }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [code, setCode] = useState(user.code);
    const navigate = useNavigate();
    

    console.log(code);

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');

    const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];

    const cambiarFocusFront = (e, index, setter) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) { //si el imput contiene un numero
            setter(value);         //asigna el numero a la variable
            if (index < refs.length - 1) {   //posicion del ref, le paso la posicon del ref, si es mas grande que -1
                refs[index + 1].current.focus();    //le hace el focus a una posicion por delante
            }
        } else if (value === "") {  //si el valor es nulo
            setter("");  //no settea nada
        }
    };

    const cambiarFocusBack = (e, index, value) => {
        if (e.key === "Backspace" && value === "" && index > 0) { //si la key es eliminar, y el valor queda vacio o es vacio, y el inicide no es menor de 0
            refs[index - 1].current.focus(); //hace focus para atras
        }
    };


    const verifyCode = async () => {
        const inputCode = `${num1}${num2}${num3}${num4}${num5}`;
        console.log(user);

        if (inputCode === code) {
            console.log("Codi correcte!");
            const newUserData = {
                first_name: user.name,
                last_name: user.lastName,
                email: user.email,
                pass: user.password,
                private: false,
            };
            // { *first_name, *last_name, *email, *pass, private, profile_picture , file_type }

            console.log(newUserData);
            try {
                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUserData)
                });
                if(response.ok){
                    console.log("Se ha creado bien");
                }
            } catch (err) {
                console.error("Error de connexió amb l'API:", err);
            }
            localStorage.setItem("activeLog", user.email);
            const loggedAcounts = JSON.parse(localStorage.getItem("loggedAcounts")) || [];
            loggedAcounts.push(user.email);
            localStorage.setItem('loggedAcounts', JSON.stringify(loggedAcounts));
            navigate('/login');
        } else {
            
            console.log("Codi incorrecte.");
        }
    };

    const resendCode = async () => {
        if (!user.email) return;

        try {
            setLoading(true);
            setSent(false);

            const response = await fetch('http://localhost:3000/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email })
            });

            const data = await response.json();
            console.log("📩 Nou codi rebut:", data.code);
            setCode(data.code); // ACTUALITZEM EL CODI
            setSent(true);

            setTimeout(() => setSent(false), 5000);
        } catch (error) {
            console.error("❌ Error en reenviar el codi:", error);
            alert("Error reenviant el codi.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="div-signup">
            <button id="btn-goBack" onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                goBack
            </button>

            <div className="title-signup">
                <h1>Verify your email</h1>
                <p>We've sent a 5 digits code to email.</p>
            </div>

            <div className="inputs-code">
                <input type="text" name="num1" id="num1" value={num1} onChange={(e) => cambiarFocusFront(e, 0, setNum1)} onKeyDown={(e) => cambiarFocusBack(e, 0, num1)} maxLength="1" ref={refs[0]} />
                <input type="text" name="num2" id="num2" value={num2} onChange={(e) => cambiarFocusFront(e, 1, setNum2)} onKeyDown={(e) => cambiarFocusBack(e, 1, num2)} maxLength="1" ref={refs[1]} />
                <input type="text" name="num3" id="num3" value={num3} onChange={(e) => cambiarFocusFront(e, 2, setNum3)} onKeyDown={(e) => cambiarFocusBack(e, 2, num3)} maxLength="1" ref={refs[2]} />
                <input type="text" name="num4" id="num4" value={num4} onChange={(e) => cambiarFocusFront(e, 3, setNum4)} onKeyDown={(e) => cambiarFocusBack(e, 3, num4)} maxLength="1" ref={refs[3]} />
                <input type="text" name="num5" id="num5" value={num5} onChange={(e) => cambiarFocusFront(e, 4, setNum5)} onKeyDown={(e) => cambiarFocusBack(e, 4, num5)} maxLength="1" ref={refs[4]} />
            </div>

            <div id="options-code">
                <button id="resend-btn" className={sent ? "send-btn" : ""} onClick={resendCode}>

                    {sent ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                        
                    ) : (
                        <svg className={loading ? "rotate-animation" : ""} dataslot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" />
                        </svg>
                    )}

                    {sent ? "Sent!!" : "Resend"}
                </button>
                <button id="verify-btn" onClick={verifyCode}>Verify</button>
            </div>
        </div>
    );
}

export default ValidateSignup;