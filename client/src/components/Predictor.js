import React, { useState, useContext, useLayoutEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Wave from 'react-wavify';
import Context from '../utils/context';
import { CSSTransition } from 'react-transition-group'; 
import '../css/Predictor.css';
import PredictorForm from './PredictorForm';
import Result from './Result';

const Predictor = () => {
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

    const [predictResults, setPredictResults] = useState(0);
    const [result, setResult] = useState('');

    let predictInnerBackground;

    useLayoutEffect(() => {
        context.assignShowNav(true);
    });

    const assignPredictResults = (page) => {
        setPredictResults(page);
    }

    const assignResult = (text) => { 
        setResult(text);
    }

    if (predictResults) {
        if (result === 'Oops! You have DIABETES.') {
            predictInnerBackground = 'predict-inner-red';
        }

        else if (result === "Great! You DON'T have diabetes.") {
            predictInnerBackground = 'predict-inner-green';
        }
    } else {
        predictInnerBackground = 'predict-inner-white'
    }

    return (
        <Fragment>
            <div className='predict-background-container'></div>
            <div className='predict-page-main-container'>
                <div className='predict-main-container'>
                    <div className={`predict-inner-container ${predictInnerBackground}`}>
                        <CSSTransition
                        in={!predictResults}
                        timeout={500}
                        classNames="predict-transition"
                        unmountOnExit
                        >
                            <PredictorForm  className='predict-form-position' assignPredictResults={(page) => assignPredictResults(page)}
                                            assignResult={(text) => assignResult(text)}/>
                        </CSSTransition>

                        <CSSTransition
                        in={predictResults}
                        timeout={500}
                        classNames="predict-transition"
                        unmountOnExit
                        >
                                
                            <Result assignPredictResults={(page) => assignPredictResults(page)}
                                    stateResult={result}/>

                        </CSSTransition>
                    </div>                
                </div>
                <div className='prediction-hist-main-container'>
                    <Wave fill='#fff'
                        paused={false}
                        className='predictor-wave predictor-wave-1'
                        options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.15,
                        points: 4
                        }}
                    />

                    <Wave fill='#f6f6f6'
                        paused={false}
                        className='predictor-wave predictor-wave-2'
                        options={{
                        height: 20,
                        amplitude: 25,
                        speed: 0.15,
                        points: 3
                        }}
                    />

                    <h1 className='predict-title'>Prediction History</h1>

                    <div className='prediction-hist-inner-container'></div>
                </div>
            </div>
        </Fragment>
    )
}


export default Predictor;