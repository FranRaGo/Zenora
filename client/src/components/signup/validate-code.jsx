import React, { useRef, useState } from "react";
import '../../styles/signup.css';
import { Link } from 'react-router-dom';

// 

const validationSignup = ( { user } ) => {
    console.log("User", user);
    console.log("User", user.code);

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');

    // console.log("✅ Usuario recibido:", JSON.stringify(user, null, 2));
    
    const goBack = ((e) => {

    });

    const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];

    const cambiarFocusFront = (e, index, setter) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) {
            setter(value);
            if (index < refs.length - 1) {
                refs[index + 1].current.focus();
            }
        } else if (value === "") {
            setter("");
        }
    };

    const cambiarFocusBack = (e, index, value) => {
        if (e.key === "Backspace" && value === "" && index > 0) {
            refs[index - 1].current.focus();
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
                <input type="text" name="num1" id="num1" value={num1} onChange={(e) => cambiarFocusFront(e, 0, setNum1)} onKeyDown={(e) => cambiarFocusBack(e, 0, num1)} maxLength="1" ref={refs[0]}/>
                <input type="text" name="num2" id="num2" value={num2}  onChange={(e) => cambiarFocusFront(e, 1, setNum2)} onKeyDown={(e) => cambiarFocusBack(e, 1, num2)} maxLength="1" ref={refs[1]}/>
                <input type="text" name="num3" id="num3" value={num3}  onChange={(e) => cambiarFocusFront(e, 2, setNum3)} onKeyDown={(e) => cambiarFocusBack(e, 2, num3)} maxLength="1" ref={refs[2]}/>
                <input type="text" name="num4" id="num4" value={num4}  onChange={(e) => cambiarFocusFront(e, 3, setNum4)} onKeyDown={(e) => cambiarFocusBack(e, 3, num4)} maxLength="1" ref={refs[3]}/>
                <input type="text" name="num5" id="num5" value={num5}  onChange={(e) => cambiarFocusFront(e, 4, setNum5)} onKeyDown={(e) => cambiarFocusBack(e, 4, num5)} maxLength="1" ref={refs[4]}/>
            </div>

            <div id="options-code">
                <button id="resend-btn" >
                    <svg dataslot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" />
                    </svg>
                    Resend
                </button>
                <button id="verify-btn" >Verify</button>
            </div>
        </div>
    );
}

export default validationSignup;