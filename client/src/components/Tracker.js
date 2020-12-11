import React, { useLayoutEffect, useContext, Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Context from '../utils/context';
import TrackerTable from './TrackerTable';
import Wave from 'react-wavify';
import '../css/Tracker.css';

const Tracker = () => {
    
    let history = useHistory();
    const context = useContext(Context);
    const [graphOption, setGraphOption] = useState('Daily Glucose');

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    return (
        <Fragment>
            <div className='tracker-background-container'></div>
            <div className='tracker-page-main-container'>
                <div className='tracker-main-container'>
                    <TrackerTable />       
                </div>
                <div className='tracker-hist-main-container'>
                    <Wave fill='#f6f6f6'
                        paused={false}
                        className='tracker-wave tracker-wave-1'
                        options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.15,
                        points: 4
                        }}
                    />

                    <Wave fill='#fff'
                        paused={false}
                        className='tracker-wave tracker-wave-2'
                        options={{
                        height: 20,
                        amplitude: 25,
                        speed: 0.15,
                        points: 3
                        }}
                    />
                    <h1 className='tracker-title'>Analytics</h1>
                    <div className='tracker-graphs-container'>
                            <div className='inner-graph-card'>
                                <h4 className='tracker-title'>{graphOption} vs. Date</h4>
                                <div className='graph-options'>
                                    <button onClick={() => setGraphOption('Daily Glucose')} className={`graph-button graph-button-left text-nowrap ${(graphOption === 'Daily Glucose') ? 'graph-blue' : 'graph-hover'}`}>Daily Glucose</button>
                                    <button onClick={() => setGraphOption('Hours of Sleep')} className={`graph-button text-nowrap ${(graphOption === 'Hours of Sleep') ? 'graph-orange' : 'graph-hover'}`}>Hours of Sleep</button>
                                    <button onClick={() => setGraphOption('Weight')} className={`graph-button text-nowrap ${(graphOption === 'Weight') ? 'graph-green' : 'graph-hover'}`}>Weight</button>
                                    <button onClick={() => setGraphOption('Height')} className={`graph-button text-nowrap ${(graphOption === 'Height') ? 'graph-purple' : 'graph-hover'}`}>Height</button>
                                    <button onClick={() => setGraphOption('BMI')} className={`graph-button graph-button-right text-nowrap ${(graphOption === 'BMI') ? 'graph-red' : 'graph-hover'}`}>BMI</button>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default Tracker; 
