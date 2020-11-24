import React, { useState, useContext, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../utils/context';
import '../css/Predictor.css';

const PredictorForm = () => {
    //Values that give a prediction outcome of True (Have Diabetes) for
    //the Random Forest Classification model:
    
    //const testData = {
    //    pregnancies: 1,
    //    glucose: 117,
    //    bloodpressure: 88,
    //    skinthickness: 24,
    //    insulin: 145,
    //    bmi: 34.5,
    //    dpf: 0.403,
    //    age: 40
    //}
    
    let history = useHistory();
    const context = useContext(Context);

    const [pregnancies, setPregnancies] = useState(0);
    const [glucose, setGlucose] = useState(0);
    const [bloodpressure, setBloodpressure] = useState(0);
    const [skinthickness, setSkinthickness] = useState(0);
    const [insulin, setInsulin] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [dpf, setDpf] = useState(0);
    const [age, setAge] = useState(0);

    useLayoutEffect(() => {
        context.assignShowNav(true);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pregnancies,
                    glucose,
                    bloodpressure,
                    skinthickness,
                    insulin,
                    bmi,
                    dpf,
                    age
                })
            })

            const json = await response.json();
            context.assignPredictionFunction(json[0])
            history.push('/results')
    }

    return (
        <div className='predict-main-container'>
            <div className='predict-split-container'>
                    <h1 className='predict-title'>Predictor Form</h1>
                    
                    <form onSubmit={handleSubmit} className="predict-form">
                        <input className="predict-form-item predict-input" type="text" placeholder="Pregnancies" onChange={e => setPregnancies(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Glucose" onChange={e => setGlucose(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Bloodpressure" onChange={e => setBloodpressure(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Skinthickness" onChange={e => setSkinthickness(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Insulin" onChange={e => setInsulin(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Bmi" onChange={e => setBmi(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Dpf" onChange={e => setDpf(e.target.value)}/>
                        <input className="predict-form-item predict-input" type="text" placeholder="Age" onChange={e => setAge(e.target.value)}/>
                        <button className="predict-form-item predict-button" type="submit">Predict</button>
                    </form>
            </div>

            <div className='predict-split-container'></div>
            
        </div>
    )
}


export default PredictorForm;