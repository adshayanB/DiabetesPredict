import React, { useState, useContext, useLayoutEffect, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Wave from 'react-wavify';
import Context from '../utils/context';
import { CSSTransition } from 'react-transition-group'; 
import '../css/Predictor.css';
import PredictorForm from './PredictorForm';
import Result from './Result';
import PredictionHistory from './PredictionHistory';
import styled from 'styled-components';

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
    const [updatePredictHistory, setUpdatePredictHistory] = useState(false);
    const [clipSize, setClipSize] = useState();
    const [predictSize, setPredictSize] = useState(false);

    const BackContainer = styled.div`
        clip: rect(0px, 100vw, ${clipSize}px, 0px);
    `;

    let predictInnerBackground;

    window.addEventListener("resize", () => {
        setClipSize(document.getElementById('predict-page-main').clientHeight);
        if (window.innerWidth < 560) {
            (predictSize != true) && setPredictSize(true)
        } else {
            (predictSize != false) && setPredictSize(false)
        }
    });

    useEffect(() => {
        setClipSize(document.getElementById('predict-page-main').clientHeight);
        if (window.innerWidth < 560) {
            (predictSize != true) && setPredictSize(true)
        } else {
            (predictSize != false) && setPredictSize(false)
        }
    }, []);

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    const assignPredictResults = (page) => {
        setPredictResults(page);
    }

    const assignResult = (text) => { 
        setResult(text);
    }

    const assignResultFace = (face) => {
        setResultFace(face);
    }

    const assignUpdatePredictHistory = (update) => {
        setUpdatePredictHistory(update);
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
        predictInnerBackground = `predict-inner-white ${(predictSize) ? 'predict-white-height-small' : 'predict-white-height-big'}`
    }

    return (
        <Fragment>
            <BackContainer className='predict-background-container'></BackContainer>
            <div id='predict-page-main' className='predict-page-main-container'>
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
                                                    assignResultFace={(face) => assignResultFace(face)}
                                                    assignUpdatePredictHistory={(update) => assignUpdatePredictHistory(update)}
                                                    stateUpdatePredictHistory={updatePredictHistory}/>
                                
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
                    <PredictionHistory stateUpdatePredictHistory={updatePredictHistory}/>
                </div>
            </div>
        </Fragment>
    )
}


export default Predictor;