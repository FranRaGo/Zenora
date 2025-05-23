import React, { useState, useEffect } from "react";
import Logo from '../../global/logo';


const SelectPlan = ({ goBack, currentPlan, onChangePlan }) => {

    const [usingPlan, setUsingPlan] = useState(currentPlan);

    const changeFree = () => {
        setUsingPlan(1);
        onChangePlan(1);
    }

    const changeStandard = () => {
        setUsingPlan(2);
        onChangePlan(2);
    }

    const changePremium = () => {
        setUsingPlan(3);
        onChangePlan(3);
    }

    return (
        <div className="step-plan-container">

            <button onClick={goBack} className="btn-back">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="div-title">
                <div id="div-logo">
                    < Logo />
                </div>
                <p>Upgrade the new Workspace</p>
                <h1>Choose the right plan for your workspace</h1>
            </div>

            <div className="plans-wrapper">
                <div className="plan-card">
                    <h2>Free</h2>
                    <p className="plan-subtitle">Perfect for personal projects or testing.</p>
                    <p className="plan-price">$0<span>/month</span></p>
                    <h3>What you get:</h3>
                    <ul className="plan-benefits">
                        <li>✔ Task & project management</li>
                        <li>✔ Real-time chat</li>
                        <li>✔ Up to 3 members</li>
                        <li>✔ 1 GB storage</li>
                        <li>✔ 7-day history</li>
                    </ul>
                    {usingPlan === 1 ? (
                        <button className="haveit-btn">You have it</button>
                    ) : (
                        <button className="subscribe-btn" onClick={changeFree}>Subscribe</button>
                    )}
                </div>

                <div className="plan-card best">
                    <h2>Standard</h2>
                    <p className="plan-subtitle">Best for small to medium teams.</p>
                    <p className="plan-price">$15<span>/month</span></p>
                    <h3>What you get:</h3>
                    <ul className="plan-benefits">
                        <li>✔ Everything in Free</li>
                        <li>✔ Up to 20 members</li>
                        <li>✔ Document management</li>
                        <li>✔ Suggestion box</li>
                        <li>✔ Calendar view</li>
                        <li>✔ Basic integrations</li>
                        <li>✔ Email support</li>
                    </ul>
                    {usingPlan === 2 ? (
                        <button className="haveit-btn">You have it</button>
                    ) : (
                        <button className="subscribe-btn" onClick={changeStandard}>Subscribe</button>
                    )}
                </div>

                <div className="plan-card">
                    <h2>Premium</h2>
                    <p className="plan-subtitle">For large teams and enterprises.</p>
                    <p className="plan-price">$40<span>/ month</span></p>
                    <h3>What you get:</h3>
                    <ul className="plan-benefits">
                        <li>✔ Everything in Standard</li>
                        <li>✔ Unlimited members</li>
                        <li>✔ Advanced permissions</li>
                        <li>✔ AI assistant (coming soon)</li>
                        <li>✔ Reports & analytics</li>
                        <li>✔ Advanced integrations</li>
                        <li>✔ Priority support</li>
                    </ul>
                    {usingPlan === 3 ? (
                        <button className="haveit-btn">You have it</button>
                    ) : (
                        <button className="subscribe-btn" onClick={changePremium}>Subscribe</button>
                    )}
                </div>
            </div>

            <p className="terms">
                <span>Terms and conditions</span> apply. Please <span>contact us</span> for custom enterprise solutions.
            </p>
        </div>
    );
};

export default SelectPlan;
