import React, { useState } from 'react';
import Users from '../users.json';
import PasswordInput from '../components/login/btn-input';
import { Route, Routes, Link } from 'react-router-dom';


const Login = () => {
    const[email, setEmail] = useState(''); 
    const[password, setPassword] = useState('');
    const[userFind, setUser] = useState(null);

    const findEmail = (e) => {
        const email = e.target.value;
        setEmail(email);

        const user = Users.usuarios.find((user) => user.email === email);
        setUser(user);

        if(user){
            console.log("encontrado, es:" + JSON.stringify(user));
        }else{
            console.log("no se ha encontrado nada");
        }
    };

    const findPassword = (e) => {
        console.log(userFind);
        const password = e.target.value;
        setPassword(password);

        if(userFind){
            if(userFind.password === password){
                console.log("La contraseña del usuario es correcta");
            }else{
                console.log("La contraseña que le pertoca no es la correcta");
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
                    <div className="inputs">
                        <label htmlFor="email-login">Email</label>
                        <svg xmlns="http://www.w3.org/2000/svg" id='emailSVG' fill="none" viewBox="0 0 24 24" strokeWidt="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <input type="text" name='email-login' id='email-login' value={email} placeholder='Insert your Email' onChange={(e) => setEmail(e.target.value)} onBlur={findEmail} />
                    </div>

                    <PasswordInput password={password} setPassword={setPassword} onChange={(e) => setPassword(e.target.value)} onBlur={findPassword}/>
                    <button>Recovery Password</button>
                </div>

                <div className="submit-login">
                    <button id='signIn-btn'>Log In</button>
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