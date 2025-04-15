import React, { useState } from "react";
import '../styles/createWorkspace.css';
import StepFeatures from '../components/createWorkspace/stepFeatures';
import StepName from '../components/createWorkspace/stepName';

const createWorkspace = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');

    const succes = ((name) => {
        setName(name);
        setStep(2);
    })

    return(
        <div className="container-createWorkspace">
            <div id='redonda'></div>
            {step === 1 && < StepName onSuccess={succes} />}
            {/* {step === 2 && < StepFeatures name={name} goBack={() => setStep(1)} />} */}
        </div>
    )
}

export default createWorkspace;