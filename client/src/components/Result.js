import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';

const Result = () => {
    const context = useContext(Context);
    let result;

    if (context.statePrediction) {
        result = <h2 className='result-bad'>Oops! You have DIABETES.</h2>;
    }
    else {
        result = <h2 className='result-good'>Great! You DON'T have diabetes.</h2>;
    }
    
    return (
        <div>
            <h1>Results</h1>
            {result}
            <Link to='/predict'>Go to Predictor</Link>
            <br />
            <Link to='/'>Go home</Link>
        </div>
    )
}

export default Result;
