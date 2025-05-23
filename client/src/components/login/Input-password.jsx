import React, { useState } from 'react';
import EyeButton from './icon-eye';
import '../../styles/login.css';


const PasswordInput = ({ id, className, password, onChange, onBlur }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className={`input-${className}`}>
        <label htmlFor={`password-${id}`}>Password</label>
        <svg id={`passwordSVG-${id}`} className="size-6 svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidt="1.5" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <input type={visible ? 'text' : 'password'} name={`password-${id}`} id={`password-${id}`} value={password} placeholder='Insert your Password' onChange={onChange} onBlur={onBlur} />
        <EyeButton visible={visible} toggleVisibility={toggleVisibility} />
        <p id={`errorPass-${id}`} className='error'>El usuario no coincide, preube con otro</p>
    </div>
  );
};

export default PasswordInput;
