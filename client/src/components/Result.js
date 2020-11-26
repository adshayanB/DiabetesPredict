import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {
    return (
        <div className='result-container'>
            <h1 className='predict-title'>Results</h1>
            <h2>{props.stateResult}</h2>
            <button onClick={() => props.assignPredictResults(0)}>Back</button>
        </div>
    )
}

export default Result;
