import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/createWorkspace.css';
import StepFeatures from './createWorkspace/stepFeatures';
import StepName from './createWorkspace/stepName';
import StepPlan from './createWorkspace/changePlan';

const createWorkspace = () => {
    const [step, setStep] = useState(1);
    const [nameSpace, setName] = useState('');
    const [currentPlan, setCurrrentPlan] = useState(1);

    const location = useLocation();
    const idUser = location.state?.id;//recoje el id que le pasa launchpad por url con useLocation

    const succes = ((name) => {
        setName(name);
        setStep(2);
    })

    const change = ((set) => {
        setStep(3);
    })

    const onChangePlan = (planId) => {
        setCurrrentPlan(planId);
        setStep(2);
    }

    return(
        <div className="container-createWorkspace">
            <div id='redonda'></div>
            {step === 1 && < StepName nameSpace={nameSpace} onSuccess={succes} />}
            {step === 2 && < StepFeatures idUser={idUser} plan={currentPlan} changePlan={change} nameSpace={nameSpace} goBack={() => setStep(1)} />}
            {step === 3 && < StepPlan currentPlan={currentPlan} goBack={() => setStep(2)} onChangePlan={onChangePlan} />}
        </div>
    )
}

export default createWorkspace;