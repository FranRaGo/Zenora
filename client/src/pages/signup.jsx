import React, { useState } from "react";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    return(
        <div className="container-login">
            <div id='redonda'></div>

            <div className="div-login">
                <div className="title-signup">
                    <h1>Join the team!</h1>
                    <p>Sign up and start managing tasks with ease.</p>
                </div>

                <div className="inputs-signup">
                    <div className="inputs">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} placeholder="Insert your Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" value={lastName} placeholder="Insert your Last Name" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} placeholder="Insert your Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} placeholder="Insert your Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className="submit-signup">
                    <button id="signIn-btn">Sign In</button>
                    <div className="register-div">
                        <p>¿Ya disfrutas de Zenora?</p>
                        <Link to="/login">Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
