import React, { useState, useEffect, useLayoutEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Context from '../utils/context';
import Wave from 'react-wavify';
import '../css/Home.css';
import Backvideo from "../videos/medical_background_video_12s_loop.mp4";
import {ReactComponent as HomePageArt} from '../images/HomePage-Art.svg';

const Home = () => {
    const context = useContext(Context);
    const [predictWidth, setPredictWidth] = useState();
    const [trackerWidth, setTrackerWidth] = useState();

    window.addEventListener("resize", () => {
        setPredictWidth(document.getElementById('home-predict-info').clientWidth);
        setTrackerWidth(document.getElementById('home-tracker-info').clientWidth);
    });

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    useEffect(() => {
        setPredictWidth(document.getElementById('home-predict-info').clientWidth)
        setTrackerWidth(document.getElementById('home-tracker-info').clientWidth);
    }, [])
    
    return (
        <Fragment>
            <div className='home-page-main-container'>
                <video autoPlay loop muted
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left:'50%',
                        top:'50%',
                        height:'100vh',
                        objectFit: 'cover',
                        transform:'translate(-50%, -50%)',
                        zIndex: '-2'
                    }}>
                    <source src={Backvideo} type="video/mp4"/>
                </video>
                <div className='home-tint'></div>
                <div className='home-content'>
                    <div className='home-content-left'></div>
                    <div className='home-content-right'>
                        <HomePageArt className='home-page-art'/>
                    </div>
                </div>
            </div>
            <div className='home-predict-info-container'>
                <div className='home-predict-content-left'></div>

                <div className='home-predict-content-right'>
                    <h1 id='home-predict-info' className='home-title'>Want to know if you <span className='home-title-blue'>have diabetes?</span></h1>
                    <div className='paragraph-font' style={{width: predictWidth}}>Our predictor helps users screen if they may have diabetes as they may not have access to a doctor or a test during these unprecedented times. This by no chance should be used as replacement for an actual medical test, but just as an initial screen to help manage it if you may not have access to a doctor.</div>
                    <button className='home-blue-button' style={{width: predictWidth}}>Go to Predictor</button>
                </div>
            </div>

            <div className='home-tracker-info-container'>
                <Wave fill='#f6f6f6'
                        paused={false}
                        className='home-wave home-wave-1'
                        options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.15,
                        points: 4
                        }}
                    />

                    <Wave fill='#fff'
                        paused={false}
                        className='home-wave home-wave-2'
                        options={{
                        height: 20,
                        amplitude: 25,
                        speed: 0.15,
                        points: 3
                        }}
                    />
                <div className='home-tracker-content-left'>
                    <h1 id='home-tracker-info' className='home-title'>Keep track of <span className='home-title-orange'>your medical data.</span></h1>
                    <div className='paragraph-font' style={{width: trackerWidth}}>Our tracker helps users to help track and manage their glucose and other medical data. This way they can keep track of any changes as during these times it is very easy to lose track of time and change. This track section will ensure users manage themselves and keep in control of their health.</div>
                    <button className='home-orange-button' style={{width: trackerWidth}}>Go to Tracker</button>
                </div>

                <div className='home-tracker-content-right'></div>

                
            </div>
    </Fragment>
    )
}

export default Home;
