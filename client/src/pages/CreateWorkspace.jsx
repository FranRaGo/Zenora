import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/createWorkspace.css';
import StepFeatures from '../components/createWorkspace/stepFeatures';
import StepName from '../components/createWorkspace/stepName';
import StepPlan from '../components/createWorkspace/changePlan';
import Loading from "../components/global/Loading";

const createWorkspace = () => {
    const [step, setStep] = useState(1);
    const [nameSpace, setName] = useState('');
    const [selectedMod, setSelectedMod] = useState([]);

    const location = useLocation();
    const idUser = location.state?.id;
    console.log("ID del usuario:", idUser);


    const succes = ((name) => {
        setName(name);
        setStep(2);
    })

    const planRequired = (plan) => {
        if (plan === "premium" || plan === "standar") {
            setStep(3);
        } else if (plan === "free") {
            console.log("👍");
        }
    };
    

    return(
        <div className="container-createWorkspace">
            <div id='redonda'></div>
            {step === 1 && < StepName nameSpace={nameSpace} onSuccess={succes} />}
            {step === 2 && < StepFeatures idUser={idUser} planRequired={planRequired} nameSpace={nameSpace} goBack={() => setStep(1)} />}
            {step === 3 && < StepPlan idUser={idUser} nameSpace={nameSpace} goBack={() => setStep(2)} />}

            {step === 4 && < Loading />}

            {/* if stepFeatures devuelve que es premium o standar, redirige a changePlan
            entonces una vez cambia de plan ya crea el espacio.
            si tira para atras vuelve a donde estaba de escoger los modulos
            si los modulos son todos gratiutos los crea ya en stepFeatures */}
        </div>
    )
}

export default createWorkspace;