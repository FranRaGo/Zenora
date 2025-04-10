import React, { useState } from "react";
import '../styles/signup.css';
import FormSignUp from '../components/signup/signup-form';
import Validate from '../components/signup/validate-code';

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [newUser, setNewUser] = useState('');
    //primera opcion componente form, una vez comprobado los campos y que este todo correcto pasamos a enviar el codigo
    //segunda parte, validacion, una vez validamos el correo con el codigo que hayamos pasado este ya habra creado su cuenta
    //y redirigiremos al login o al home , dependiendo de que salimos mas beneficiados.

    const succes = ((userData) => {
        setNewUser(userData);
        setStep(2);
    });

    return(
        <div className="container-signup">
            <div id='redonda'></div>
            {step === 1 && < FormSignUp onSuccess={succes} />}
            {step === 2 && < Validate user={newUser} goBack={() => setStep(1)} />}    
        </div>
    );
}

export default SignUp;
