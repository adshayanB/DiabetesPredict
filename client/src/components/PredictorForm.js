import React, { useState, useContext, Fragment } from 'react';
import Context from '../utils/context';
import '../css/PredictorForm.css'

const PredictorForm = (props) => {
    const context = useContext(Context);
    const [pregnancies, setPregnancies] = useState(0);
    const [glucose, setGlucose] = useState(0);
    const [bloodpressure, setBloodpressure] = useState(0);
    const [skinthickness, setSkinthickness] = useState(0);
    const [insulin, setInsulin] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [dpf, setDpf] = useState(0);
    const [age, setAge] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('token')){

        
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': localStorage.getItem('token')
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
            //history.push('/results')
            console.log(json[0])
            props.assignPredictResults(1);
            if (json[0]) {
                props.assignResult('Oh no! You have diabetes!');
                props.assignResultFace(<div className='frown-container'></div>);
            } 
            else {
                props.assignResult("Great! You don't have diabetes!");
                props.assignResultFace(<div className='smile-container'></div>);
            }
        } else {
            console.log('You must be logged in to predict.')
        }
            
    }
    
    return (
        <div className='predictor-form-fill'>
            <h1 className='predict-title'>Do you have <span className='predict-title-diabetes'>diabetes?</span></h1>
                            
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
    )
}

export default PredictorForm;
