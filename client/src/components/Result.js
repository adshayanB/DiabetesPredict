import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Result.css'

const Result = (props) => {
    return (
        <div className='result-container'>
            <h1 className='result-title'>Results</h1>
            {props.stateResultFace}
            <h2>{props.stateResult}</h2>
            <button className='result-form-item result-back-button' type='button' onClick={() => props.assignPredictResults(0)}>Back</button>
        </div>
    )
}

export default Result;
