import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_API_URL;

const Moduls = ({ idUser, plan, changePlan, nameSpace, goBack }) => {
    const [modules, setModules] = useState([]);
    const [selectedModuls, setSelectedMod] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getModuls = async () => {
            try {
                const res = await fetch(`${apiURL}/api/modules`);
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

    const changeClass = (mod) => {
        //devuelve true o false si esta seleccionado
        const yaSeleccionado = selectedModuls.some(sm => sm.id === mod.id);
        //si esta seleccionado y el plan del modulo es 1 quiere decir que esta bien y no hace nada
        if (mod.plan_id === 1 && yaSeleccionado) {
            return;
        }
        //si el plan que tienes es mas peuqeño del que tiene el modulo te redirige a cambiar de plan a uno mas alto
        if (mod.plan_id > plan) {
            changePlan(mod.plan_id);
            return;
        }
        //si ya esta seleccionado lo quita de seleccionado, y si no lo selecciona y lo mete en {}
        if (yaSeleccionado) {
            setSelectedMod(selectedModuls.filter(sm => sm.id !== mod.id));
        } else {
            setSelectedMod([...selectedModuls, mod]);
        }
    };

    const createWorkspace = async () => {
        const newSpace = {
            name: nameSpace,
            admin_id: idUser,
            plan_id: plan,
            logo: null,
            file_type: null
        }        
        try {
            const space = await fetch(`${apiURL}/api/space`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSpace)
            });

            if(!space.ok) throw new Error("Can't create WorkSpace");

            const response = await space.json();
            const spaceId = response.spaceId;
            localStorage.setItem("spaceActive", response.token);

            for(let i=0; i<selectedModuls.length; i++){
                const mod = selectedModuls[i];
                const bodyResMod = {
                    spaceId: spaceId,
                    moduleId: mod.id
                }

                const resMod = await fetch(`${apiURL}/api/modSpace`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(bodyResMod)
                });

                if(!resMod.ok) throw new Error("Error al añadir el modulo", mod.name);

            }
            navigate("/");
        } catch (err) {
            console.error("Error al crear el workspace:", err);
        }

    }


    return (
        <div className="step-features-container">
            <button onClick={goBack} className="btn-back">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="div-title-space">
                <h1>Pick the modules you need </h1>
            </div>

            <div className="div-select-moduls">
                {modules.map((mod) => {
                    const isSelected = selectedModuls.some(sele => sele.id === mod.id);
                    return(
                        <button key={mod.id} id={mod.id} className={`btn-modul ${isSelected ? 'selected' : ''}`} onClick={(e) => changeClass(mod)}>
                            {mod.name} <span>{mod.plan_name}</span>
                        </button>
                    );
                })}   
            </div>

            <button className="btn-next" onClick={createWorkspace}>Create</button>
        </div>
    )
}

export default Moduls;
