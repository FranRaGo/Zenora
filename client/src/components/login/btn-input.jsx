import React, { useState } from 'react';
import EyeButton from './icon-eye';

const PasswordInput = ({ password, setPassword, onChange, onBlur }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible); // Cambia el estado entre true o false
  };

  const findPassword = (e) => {
    setPassword(e.target.value); // Actualiza el estado de la contraseña en el componente padre
  };

  return (
    <div className="inputs">
        <label htmlFor="password-login">Password</label>
        <svg id='passwordSVG' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <input type={visible ? 'text' : 'password'} name='password-login' id='password-login' value={password} placeholder='Insert your Password' onChange={onChange} onBlur={onBlur} />
        <EyeButton visible={visible} toggleVisibility={toggleVisibility} />
    </div>
  );
};

export default PasswordInput;
