import React, { useState } from "react";
import '../../styles/signup.css';
import { Link } from 'react-router-dom';
import NameInput from './Input-name';
import LastnameInput from './Input-lastName';
import EmailInput from '../login/input-email';
import PasswordInput from '../login/input-password';

const FormSignUp = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const validateName = ((e) => {
        const regexName = /^[A-Za-z]+$/;
        const validName = regexName.test(name);

        const inputName = document.getElementById("name-signup");
        const svgName = document.getElementById("nameSVG-signup");
        const errorName = document.getElementById("errorName-signup");

        if (validName) {
            inputName.classList.remove("inputError");
            svgName.classList.remove("redError");
            errorName.classList.remove("showError");
            return true;
        } else if (name === '') {
            inputName.classList.remove("inputError");
            svgName.classList.remove("redError");
            errorName.classList.remove("showError");
            return false;
        } else {
            errorName.classList.add("showError");
            inputName.classList.add("inputError");
            svgName.classList.add("redError");
            errorName.textContent = "Name invalid, only strings";
            return false;
        }
    });

    const validateLastname = (e) => {
        const input = document.getElementById("lastname-signup");
        const svg = document.getElementById("lastNameSVG-signup");
        const error = document.getElementById("errorLastName-signup");

        const value = input.value.trim();
        const regex = /^[A-Za-z]+$/;
        const isValid = regex.test(value);

        if (isValid) {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return true;
        } else if (value === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        } else {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Last name invalid, only letters allowed.";
            return false;
        }
    };

    //comprobar tambien si existe en la base de datos ya
    const validateEmail = async (e) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const error = document.getElementById("errorEmail-signup");
        const svg = document.getElementById("emailSVG-signup");
        const input = document.getElementById("email-signup");
    
        const emailValue = input.value.trim();
    
        if (emailValue === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        }
    
        if (!regexEmail.test(emailValue)) {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Invalid email format, please try again.";
            return false;
        }
    
        try {
            const res = await fetch(`http://localhost:3000/api/usersFilter/email/${emailValue}`);
            if (res.ok) {
                // L'email ja existeix, bloqueja registre
                input.classList.add("inputError");
                svg.classList.add("redError");
                error.classList.add("showError");
                error.textContent = "This email is already registered. Please log in.";
                return false;
            } else {
                // Si el servidor retorna 404, llavors l'email no està registrat
                input.classList.remove("inputError");
                svg.classList.remove("redError");
                error.classList.remove("showError");
                return true;
            }
        } catch (err) {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Connection error validating email.";
            return false;
        }
    };

    const validatePassword = (e) => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        const input = document.getElementById("password-signup");
        const svg = document.getElementById("passwordSVG-signup");
        const error = document.getElementById("errorPass-signup");

        const passwordValue = input.value.trim();
        const validPassword = regexPassword.test(passwordValue);

        if (validPassword) {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return true;
        } else if (passwordValue === '') {
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        } else {
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Invalid password, please try again";
            return false;
        }
    };

    const sendCode = async () => {
        if (!email || !email.includes("@")) {  //email no valido
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();
            return data.code;
        } catch (error) {
            console.error("❌ Error al enviar:", error); //problema con enviar el codigo al email
            return null;
        }
    };

    const validateUser = async (e) => {
        e.preventDefault();

        const nameValido = validateName();
        const lastNameValido = validateLastname();
        const emailValido = validateEmail();
        const passwordValido = validatePassword();
        //Name Input
        const inputName = document.getElementById("name-signup");
        const svgName = document.getElementById("nameSVG-signup");
        const errorName = document.getElementById("errorName-signup");
        //LastName Input
        const inputLast = document.getElementById("lastname-signup");
        const svgLast = document.getElementById("lastNameSVG-signup");
        const errorLast = document.getElementById("errorLastName-signup");
        //Email Input
        const errorEmail = document.getElementById("errorEmail-signup");
        const svgEmail = document.getElementById("emailSVG-signup");
        const inputEmail = document.getElementById("email-signup");
        //Password Input
        const inputPass = document.getElementById("password-signup");
        const svgPass = document.getElementById("passwordSVG-signup");
        const errorPass = document.getElementById("errorPass-signup");

        if (!nameValido){
            errorName.classList.add("showError");
            inputName.classList.add("inputError");
            svgName.classList.add("redError");
            errorName.textContent = "Name empty, please rellena el nombre";
        }else{
            inputName.classList.remove("inputError");
            svgName.classList.remove("redError");
            errorName.classList.remove("showError");
        }

        if(!lastNameValido){
            inputLast.classList.add("inputError");
            svgLast.classList.add("redError");
            errorLast.classList.add("showError");
            errorLast.textContent = "Last name invalid, only letters allowed.";
            
        }else{
            inputLast.classList.remove("inputError");
            svgLast.classList.remove("redError");
            errorLast.classList.remove("showError");
        }

        if(!emailValido){
            inputEmail.classList.add("inputError");
            svgEmail.classList.add("redError");
            errorEmail.classList.add("showError");
            errorEmail.textContent = "Last name invalid, only letters allowed.";
        }else{
            inputEmail.classList.remove("inputError");
            svgEmail.classList.remove("redError");
            errorEmail.classList.remove("showError");
        }

        if(!passwordValido){
            inputPass.classList.add("inputError");
            svgPass.classList.add("redError");
            errorPass.classList.add("showError");
            errorPass.textContent = "Last name invalid, only letters allowed.";
        }else{
            inputPass.classList.remove("inputError");
            svgPass.classList.remove("redError");
            errorPass.classList.remove("showError");
        }

        if (!nameValido || !lastNameValido || !emailValido || !passwordValido) {
            return;
        }

        const codeResult = await sendCode();
        if (!codeResult) {
            return;
        }

        const userData = { name, lastName, email, password, code: codeResult };
        onSuccess(userData);
    };


    return (
        <div className="div-signup">
            <div className="title-signup">
                <h1>Join the team!</h1>
                <p>Sign up and start managing tasks with ease.</p>
            </div>

            <div className="div-inputs-signup">
                <NameInput id="signup" className="signup" name={name} setName={setName} onChange={(e) => setName(e.target.value)} onBlur={validateName} />
                <LastnameInput id="signup" className="signup" lastName={lastName} setLastName={setLastName} onChange={(e) => setLastName(e.target.value)} onBlur={validateLastname} />
                <EmailInput id="signup" className="signup" placeholder="ferran@example.com" email={email} setEmail={setEmail} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                <PasswordInput id="signup" className="signup" password={password} setPassword={setPassword} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
            </div>

            <div className="submit-signup">
                <button id="signup-btn" onClick={validateUser}>Sign Up</button>
                <div className="register-div">
                    <p>Are you already enjoying Zenora?</p>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default FormSignUp;