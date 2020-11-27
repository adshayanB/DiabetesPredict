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
    const [resultFace, setResultFace] = useState(null);

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

    const assignResultFace = (face) => {
        setResultFace(face);
    }

    if (predictResults) {
        if (result === 'Oh no! You have diabetes!') {
            predictInnerBackground = 'predict-inner-red';
        }

        else if (result === "Great! You don't have diabetes!") {
            predictInnerBackground = 'predict-inner-green';
        }
    } else {
        console.log('test')
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
                            timeout={1000}
                            classNames="predict-transition"
                            unmountOnExit
                        >
                            <div className='predict-form-position'>
                                
                                    <PredictorForm  assignPredictResults={(page) => assignPredictResults(page)}
                                                    assignResult={(text) => assignResult(text)}
                                                    assignResultFace={(face) => assignResultFace(face)}/>
                                
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={predictResults}
                            timeout={1000}
                            classNames="predict-transition"
                            unmountOnExit
                        >
                            <div className='predict-form-position'>
                                    <Result className='result-component' assignPredictResults={(page) => assignPredictResults(page)}
                                            stateResult={result}
                                            stateResultFace={resultFace}/>
                            </div>
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