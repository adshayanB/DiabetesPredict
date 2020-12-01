import React, { useLayoutEffect, useContext, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Context from '../utils/context';
import PredictionHistory from './PredictionHistory';
import Wave from 'react-wavify';
import '../css/Tracker.css';

const Tracker = () => {
    
    let history = useHistory();
    const context = useContext(Context);

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    return (
        <Fragment>
            <div className='tracker-background-container'></div>
            <div className='tracker-page-main-container'>
                <div className='tracker-main-container'>
                    <PredictionHistory />       
                </div>
                <div className='tracker-hist-main-container'>
                    <Wave fill='#fff'
                        paused={false}
                        className='tracker-wave tracker-wave-1'
                        options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.15,
                        points: 4
                        }}
                    />

                    <Wave fill='#f6f6f6'
                        paused={false}
                        className='tracker-wave tracker-wave-2'
                        options={{
                        height: 20,
                        amplitude: 25,
                        speed: 0.15,
                        points: 3
                        }}
                    />
                </div>
            </div>
        </Fragment>
    )
}


export default Tracker; 
