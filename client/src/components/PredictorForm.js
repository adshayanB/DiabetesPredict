import React, { useState, useContext, Fragment } from 'react';
import Context from '../utils/context';
import '../css/PredictorForm.css';

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

        
            let response1 = await fetch('/api/predict', {
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

            let json1 = await response1.json()
            console.log(json1[0])

            let response2 = await fetch('/api/predictData', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'x-access-tokens': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    pregnancies,
                    glucose,
                    bp: bloodpressure,
                    st: skinthickness,
                    insulin,
                    bmi,
                    dpf,
                    age,
                    result: json1[0]
                })
            })

            let json2 = await response2.json();
            console.log(json2);

            //history.push('/results')
            props.assignPredictResults(1);

            context.assignPredictionFunction(json1[0])
            props.assignUpdatePredictHistory(!props.stateUpdatePredictHistory)

            if (json1[0]) {
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

    const setInfo = (infoArr) => {
        props.assignInfoNotification(infoArr);
        props.assignInfoNotifShow(true);
    }
    
    return (
        <div className='predictor-form-fill'>
            <h2 className='predict-title'>Do you have <span className='predict-title-diabetes'>diabetes?</span></h2>
                            
            <form onSubmit={handleSubmit} className="predict-form">
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Pregnancies" onChange={e => setPregnancies(e.target.value)}/>
                    <div onClick={() => setInfo(['Pregnancies', 'In this field, you must input the number of times that you have been pregnant.'])} className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Glucose (mg/dL)" onChange={e => setGlucose(e.target.value)}/>
                    <div onClick={() => setInfo(['Glucose (mg/dL)', <Fragment>In this field, you must input your plasma glucose concentration over 2 hours in milligrams per deciliter (mg/dL).<br/><br/>You can find out your plasma glucose concentration through an oral glucose tolerance test (OGTT) from your doctor's office, a health clinic, or a hospital.</Fragment>])} className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Bloodpressure (mm Hg)" onChange={e => setBloodpressure(e.target.value)}/>
                    <div onClick={() => setInfo(['Bloodpressure (mm Hg)', <Fragment>In this field, you must input your diastolic bloodpressure in millimeters of mercury (mm Hg).<br/><br/>You can find out your diastolic bloodpressure at your doctor's office or pharmacy, or you can perform a bloodpressure check at home using a blood pressure monitor (sphygmomanometer). The diastolic bloodpressure is the bottom number in the bloodpressure reading.</Fragment>])} className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Skinthickness (mm)" onChange={e => setSkinthickness(e.target.value)}/>
                    <div onClick={() => setInfo(['Skinthickness (mm)', <Fragment>In this field, you must input your triceps skin fold thickness in millimeters (mm).<br/><br/>You can find out your triceps skinfold thickness at your doctor's office.</Fragment>])} className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Insulin" onChange={e => setInsulin(e.target.value)}/>
                    <div className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Bmi" onChange={e => setBmi(e.target.value)}/>
                    <div className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Dpf" onChange={e => setDpf(e.target.value)}/>
                    <div className='information-icon' ></div>
                </div>
                <div className='predict-item-container'>
                    <input className="predict-form-item predict-input" type="number" placeholder="Age" onChange={e => setAge(e.target.value)}/>
                    <div className='information-icon' ></div>
                </div>
                
                <button className="predict-button" type="submit">Predict</button>
            </form>
        </div>
    )
}

export default PredictorForm;
