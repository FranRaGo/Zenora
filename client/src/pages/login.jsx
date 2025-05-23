import React, { useState, useEffect } from 'react';
import EmailInput from '../components/login/Input-email';
import PasswordInput from '../components/login/Input-password';
import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import '../styles/login.css';


const Login = () => {
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userFind, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenActive = localStorage.getItem("activeToken");
        if (tokenActive) {
            navigate('/launchpad');
        }
    }, []);

    const findEmail = async (e) => {
        const svg = document.getElementById("emailSVG-login");
        const input = document.getElementById("email-login");
        const error = document.getElementById("errorEmail-login");
        const email = e.target.value;
        setEmail(email);

        if (email === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            setUser(null);
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/usersFilter/email/${email}`);
            if (!res.ok) throw new Error("No user found");
            const user = await res.json(); //user en json
            if (user.length === 0) throw new Error("No user found");

            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            console.log("user encontrado");
            
            setUser(user[0]);
            console.log(user);
        } catch (err) {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "No user found with that email address, please try again.";
            setUser(null);
        }
    }


    const findPassword = (e) => {
        const svg = document.getElementById("passwordSVG-login");
        const input = document.getElementById("password-login");
        const error = document.getElementById("errorPass-login");

        const password = e.target.value;
        setPassword(password);

        if (password.trim() === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
        } else if (password.length >= 8) {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
        } else {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Min 8 characters password, please try again.";
        }
    }

    const validate = (e) => {
        const input_email = document.getElementById("email-login");
        const svg_email = document.getElementById("emailSVG-login");
        const error_email = document.getElementById("errorEmail-login");

        const input_password = document.getElementById("password-login");
        const svg_password = document.getElementById("passwordSVG-login");
        const error_password = document.getElementById("errorPass-login");

        // Email validation
        if (input_email.value === '') {
            error_email.classList.add("showError");
            input_email.classList.add("inputError");
            svg_email.classList.add("redError");
            error_email.textContent = "This email is invalid, please try again.";
        } else if (!userFind) {  // If no user is found with that email
            error_email.classList.add("showError");
            input_email.classList.add("inputError");
            svg_email.classList.add("redError");
            error_email.textContent = "No user found with this email.";
        }

        // Password validation
        if (input_password.value === '') {
            error_password.classList.add("showError");
            input_password.classList.add("inputError");
            svg_password.classList.add("redError");
            error_password.textContent = "This password is invalid, min 8 characters.";
        } else {
            error_password.classList.remove("showError");
            input_password.classList.remove("inputError");
            svg_password.classList.remove("redError");
        }

        // Actual login validation
        if (userFind && userFind.pass === password) {
            const loggedAcounts = JSON.parse(localStorage.getItem("loggedTokens")) || [];

            if (!loggedAcounts.includes(userFind.token)) {
                loggedAcounts.push(userFind.token);
            }

            localStorage.setItem('loggedTokens', JSON.stringify(loggedAcounts));
            localStorage.setItem('activeToken', userFind.token);

            navigate('/launchpad');
        } else if (userFind && userFind.pass !== password) {
            error_password.classList.add("showError");
            input_password.classList.add("inputError");
            svg_password.classList.add("redError");
            error_password.textContent = "Incorrect password, please try again.";
        }
    }

    return (
        <div className="container-login">
            <div id='redonda'></div>

            <div className="div-login">

                <div className="title-login">
                    <h1>Log In</h1>
                    <p>welcome back you're been missed!</p>
                </div>

                <div className="inputs-login">
                    < EmailInput id="login" className="login" placeholder="Insert your email" email={email} setEmail={setEmail} onChange={(e) => setEmail(e.target.value)} onBlur={findEmail} />
                    < PasswordInput id="login" className="login" password={password} setPassword={setPassword} onChange={(e) => setPassword(e.target.value)} onBlur={findPassword} />
                    <button id='recoveryPass'>Recovery Password</button>
                </div>

                <div className="submit-login">
                    <button id='signIn-btn' onClick={validate}>Log In</button>
                    <div className='register-div'>
                        <p>Not a member?</p>
                        <Link to="/signup" className='a-login'>Sign Up</Link>
                    </div>
                </div>

            </div>
        </div>
    )

};
export default Login;