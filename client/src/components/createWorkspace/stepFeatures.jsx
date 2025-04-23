import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Moduls = ({ nameSpace, goBack, plan, idUser, changePlan }) => {
    const [modules, setModules] = useState([]);
    const [selectedMod, setSelectedMod] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getModuls = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/modules');
                if (res.ok) {
                    const data = await res.json();
                    // console.log(data);  Aquí ya puedes ver todos los módulos
                    setModules(data);

                    let allowedModules;

                    if (plan === 3) {
                        allowedModules = data;
                    } else if (plan === 2) {
                        allowedModules = data.filter(mod => mod.plan_id === 1 || mod.plan_id === 2);
                    } else {
                        allowedModules = data.filter(mod => mod.plan_id === 1);
                    }

                    const modulosFinales = allowedModules.map(mod => ({
                        id: mod.id,
                        name: mod.name,
                        plan_id: mod.plan_id,
                        plan_name: mod.plan_name,
                    }));

                    console.log("modulos finales. ", modulosFinales);

                    setSelectedMod(modulosFinales);
                }
            } catch (err) {
                console.log('Error fetching modules:', err);
            }
        };
        getModuls();
    }, [plan]);

    const changeClass = (e, mod) => {
        e.target.classList.toggle("selected");
        // console.log(mod);

        if (mod.plan_id === 2) {
            changePlan(2);
            return;
        } else if (mod.plan_id === 3) {
            changePlan(3);
            return;
        }

        let modFound = selectedMod.find(sm => sm.id === mod.id);

        if (modFound) {
            setSelectedMod(selectedMod.filter(sm => sm.id !== mod.id));
        } else {
            setSelectedMod([...selectedMod, mod]);//suma el mod mas los que habia
        }
    }


    const createWorkspace = async () => {
        const modFree = selectedMod.filter(ms => ms.plan_id === 1);
        const modStandar = selectedMod.filter(ms => ms.plan_id === 2);
        const modPremium = selectedMod.filter(ms => ms.plan_id === 3);

        if (modStandar.length > 0) {
            console.log("Se necesita actualizar a standar");
            planRequired("standar");
            return;
        }

        if (modPremium.length > 0) {
            console.log("Se necesita actualizar premium");
            planRequired("premium");
            return;
        }

        const newSpace = {
            name: nameSpace,
            admin_id: idUser,
            plan_id: 1,
            logo: null,
            file_type: null
        }

        try {
            const api = await fetch('http://localhost:3000/api/space', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSpace)
            });

            const res = await api.json();
            console.log("La respuesta es: ", res);

        } catch (err) {
            console.error("Error al crear el workspace:", err);
        }

        // Si no hay modulos de pago, se crea el workspace
        console.log("WORKSPACE CREADO", newSpace);
        planRequired("free");

        //  name, admin_id, plan_id, logo, file_type
        //si hay en standar o premium pedimos que pagen para que el espacio de trabajo suba de plan, entonces una vez pagado se crea el plan o free o premium dependiendo de lo que le hayan pagado
    }


    return (
        <div className="step-features-container">
            <button onClick={goBack} className="btn-back">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="div-title">
                <h1>Pick the modules you need </h1>
            </div>

            <div className="div-select-moduls">
                {modules.map((mod) => mod.plan_id === 1 ? (
                    <button key={mod.id} id={mod.id} className="btn-modul selected">
                        {mod.name} <span>{mod.plan_name}</span>
                    </button>
                ) : (
                    <button key={mod.id} id={mod.id} className="btn-modul" onClick={(e) => changeClass(e, mod)}>
                        {mod.name} <span>{mod.plan_name}</span>
                    </button>
                )
                )}
            </div>

            <button className="btn-next" onClick={createWorkspace}>Create</button>
        </div>
    )
}

export default Moduls;