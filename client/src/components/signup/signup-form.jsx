import React, { useState } from "react";
import '../../styles/signup.css';
import { Link } from 'react-router-dom';
import NameInput from '../../components/signup/input-name';
import LastnameInput from '../../components/signup/input-lastName';
import EmailInput from '../../components/login/input-email';
import PasswordInput from '../../components/login/input-password';

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
            console.log("Nombre validado");
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
            console.log("Nombre invalidado");
            return false;
        }
    });

    const validateLastname = (e) => {
        const input = document.getElementById("lastname-signup");
        const svg = document.getElementById("lastNameSVG-signup");
        const error = document.getElementById("errorLastName-signup");

        if (!input || !svg || !error) {
            console.warn("❗ Elementos no encontrados en el DOM para la validación de apellido.");
            return false;
        }

        const value = input.value.trim();
        const regex = /^[A-Za-z]+$/;
        const isValid = regex.test(value);

        if (isValid) {
            console.log("✅ Apellido válido");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return true;
        } else if (value === '') {
            console.log("🟡 Apellido vacío");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        } else {
            console.log("❌ Apellido inválido");
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Last name invalid, only letters allowed.";
            return false;
        }
    };

    //comprobar tambien si existe en la base de datos ya
    const validateEmail = ((e) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const error = document.getElementById("errorEmail-signup");
        const svg = document.getElementById("emailSVG-signup");
        const input = document.getElementById("email-signup");

        const emailValue = input.value.trim(); // Mejor usar el valor del input directamente

        if (!input || !error || !svg) {
            console.warn("Algún elemento no se encontró en el DOM");
            return false;
        }

        if (regexEmail.test(emailValue)) {
            console.log("✅ Email validado");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return true;
        } else if (emailValue === '') {
            console.log("🟡 Email vacío");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        } else {
            console.log("❌ Email inválido");
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Invalid email, please try again";
            return false;
        }
    });

    const validatePassword = (e) => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        const input = document.getElementById("password-signup");
        const svg = document.getElementById("passwordSVG-signup");
        const error = document.getElementById("errorPass-signup");

        if (!input || !svg || !error) {
            console.warn("Algún elemento de contraseña no fue encontrado en el DOM");
            return false;
        }

        const passwordValue = input.value.trim();
        const validPassword = regexPassword.test(passwordValue);

        if (validPassword) {
            console.log("✅ Password validado");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return true;
        } else if (passwordValue === '') {
            console.log("🟡 Password vacío");
            input.classList.remove("inputError");
            svg.classList.remove("redError");
            error.classList.remove("showError");
            return false;
        } else {
            console.log("❌ Password inválido");
            input.classList.add("inputError");
            svg.classList.add("redError");
            error.classList.add("showError");
            error.textContent = "Invalid password, please try again";
            return false;
        }
    };

    const sendCode = async () => {
        if (!email || !email.includes("@")) {
            console.log("❗ Email no válido antes de enviar");
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
            console.error("❌ Error al enviar:", error);
            alert("Hubo un problema al enviar el correo.");
            return null;
        }
    };

    const validateUser = async (e) => {
        e.preventDefault();

        const nameValido = validateName();
        const lastNameValido = validateLastname();
        const emailValido = validateEmail();
        const passwordValido = validatePassword();

        // Si alguno falla, no continúes
        if (!nameValido || !lastNameValido || !emailValido || !passwordValido) {
            console.log("Validación fallida. No se envía el formulario.");
            return;
        }
        const codeResult = await sendCode();
        if (!codeResult) {
            alert("No se pudo generar el código.");
            return;
        }

        const userData = { name, lastName, email, password, code: codeResult };
        console.log("✅ Todos los campos validados. Enviando datos:", userData);
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
                    <Link to="/login">Iniciar sesión</Link>
                </div>
            </div>
        </div>
    );
}

export default FormSignUp;