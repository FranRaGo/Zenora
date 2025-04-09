import React, { useState, useEffect} from 'react';
import Users from '../users.json';
import EmailInput from '../components/login/input-email';
import PasswordInput from '../components/login/input-password';
import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import '../styles/login.css';


const Login = () => {
    const[email, setEmail] = useState(''); 
    const[password, setPassword] = useState('');
    const[userFind, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const activeLog = localStorage.getItem("activeLog");
        if(activeLog){
            navigate('/');
        }
    }, []);

    const findEmail = (e) => {
        const svg = document.getElementById("emailSVG-login");
        const input = document.getElementById("email-login");
        const error = document.getElementById("errorEmail-login");
        const email = e.target.value;
        setEmail(email);
        
        const user = Users.usuarios.find((user) => user.email === email);
    
        if (email === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
        } else if (!user) {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "No user found with that email address, please try again.";
            setUser(null);
        } else {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            setUser(user);
        }
    };

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
    };
    
    const validate = (e) => {
        const input_email = document.getElementById("email-login");
        const svg_email = document.getElementById("emailSVG-login");
        const error_email = document.getElementById("errorEmail-login");
    
        const input_password = document.getElementById("password-login");
        const svg_password = document.getElementById("passwordSVG");
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
        if (userFind && userFind.password === password) {
            const loggedAcounts = JSON.parse(localStorage.getItem("loggedAcounts")) || [];
    
            if (!loggedAcounts.includes(userFind.email)) {
                loggedAcounts.push(userFind.email);
            }
    
            localStorage.setItem('loggedAcounts', JSON.stringify(loggedAcounts));
            localStorage.setItem('activeLog', userFind.email);
    
            navigate('/');
        } else {
            if (userFind && userFind.password !== password) {
                error_password.classList.add("showError");
                input_password.classList.add("inputError");
                svg_password.classList.add("redError");
                error_password.textContent = "Incorrect password, please try again.";
            }
        }
    };

    return(
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
                        <Link to="/signup">Register</Link>
                    </div>
                </div>

            </div>
        </div>
        
        
    )
}

export default Login;