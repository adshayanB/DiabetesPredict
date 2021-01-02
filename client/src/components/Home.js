import React, { useState, useEffect, useLayoutEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Context from '../utils/context';
import Wave from 'react-wavify';
import '../css/Home.css';
import Backvideo from "../videos/medical_background_video_12s_loop.mp4";
import {ReactComponent as HomePageArt} from '../images/HomePage-Art.svg';
import Typewriter from 'typewriter-effect/dist/core';
import PredictPreview from '../images/home-predictor-preview.png';
import TrackerPreview from '../images/home-tracker-preview.png';
import { motion } from 'framer-motion';

const Home = () => {
    const context = useContext(Context);
    const [predictWidth, setPredictWidth] = useState();
    const [trackerWidth, setTrackerWidth] = useState();
    const [mainWidth, setMainWidth] = useState();
    const [mainTitleSize, setMainTitleSize] = useState();
    const [translateUp, setTranslateUp] = useState(0);

    let typewriterSlogan = document.getElementById('typewriting-slogan');

    let typewriter = new Typewriter(typewriterSlogan, {
        loop: true,
        delay: 75,
    });

    typewriter
        .typeString('checks on you.')
        .pauseFor(3000)
        .deleteAll()
        .typeString('protects you.')
        .pauseFor(3000)
        .deleteAll()
        .typeString('cares for you.')
        .pauseFor(3000)
        .deleteAll()
        .start();

    window.addEventListener("resize", () => {
        setPredictWidth(document.getElementById('home-predict-info').clientWidth);
        setTrackerWidth(document.getElementById('home-tracker-info').clientWidth);
        if (window.innerWidth < 992){
            console.log('did not change')
            setMainWidth(document.getElementById('home-main-info').clientWidth)
            setTranslateUp(2317120*(window.innerWidth**(-1.693566)))
            setMainTitleSize('1.8rem');
        } else {
            console.log('changed')
            setMainWidth((window.innerWidth)/2.742)
            setMainTitleSize((window.innerWidth)/48);
        }
    });

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    useEffect(() => {
        setPredictWidth(document.getElementById('home-predict-info').clientWidth);
        setTrackerWidth(document.getElementById('home-tracker-info').clientWidth);
        if (window.innerWidth < 992){
            setMainWidth(document.getElementById('home-main-info').clientWidth)
            setTranslateUp(2317120*(window.innerWidth**(-1.693566)))
            setMainTitleSize('1.8rem');
        } else {
            setMainWidth((window.innerWidth)/2.742)
            setMainTitleSize((window.innerWidth)/48);
        }
    }, [])
    
    return (
        <Fragment>
            <div className='home-page-main-container'>
                <video autoPlay loop muted
                    className='home-background-video'>
                    <source src={Backvideo} type="video/mp4"/>
                </video>
                <div className='home-tint'></div>
                <div className='home-content'>
                    <motion.div initial={{ x: -500, opacity: 0}} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.75, ease: "easeInOut" }} className='home-content-left home-mobile-background'>
                        <h1 id='home-main-info' className='home-title home-title-blue' style={{fontSize: mainTitleSize}}>The pocket doctor that <span id='typewriting-slogan' className='home-title-orange'>cares for you.</span></h1>
                        <div className='paragraph-font' style={{width: mainWidth}}>Diabetes Doctor is a virtual platform built to help individuals screen for diabetes using our accurate machine learning model, and track and manage their medical data. </div>
                        <div className='home-content-button-group' style={{width: mainWidth}}>
                        {(!context.stateLoggedIn) && <Link to="/auth/login" className="remove-link-styles">
                            <button className='home-blue-button' style={{width: (mainWidth)*0.48}}>Login</button>
                        </Link>}
                        {(!context.stateLoggedIn) && <Link to="/auth/register" className="remove-link-styles">
                            <button className='home-orange-button' style={{width: (mainWidth)*0.48}}>Register</button>
                        </Link>}
                        </div>
                    </motion.div>
                    <div className='home-content-right'>
                        <motion.div initial={{ y: -5 }} animate={{ y: 5 }} transition={{ duration: 1, ease: "easeInOut", yoyo: Infinity }} className='home-page-art-container'>
                            <HomePageArt className='home-page-art' style={{transform: `translateY(${(context.stateIsMobile) ? translateUp : 0}%)`}}/>
                        </motion.div>
                    </div>
                    <HashLink smooth to='/#home-predict-container' className='remove-link-styles'><div className='home-arrow'></div></HashLink>
                </div>
            </div>
            <div id='home-predict-container' className='home-predict-info-container'>
                <div className='home-predict-content-left'>
                    <img src={PredictPreview} width={(context.stateIsMobile) ? '100%' : '80%'}/>
                </div>

                <div className='home-predict-content-right'>
                    <h2 id='home-predict-info' className='home-title home-subheading'>Find out if you <span className='home-title-blue'>have diabetes.</span></h2>
                    {/*<div className='paragraph-font' style={{width: predictWidth}}>Our predictor helps users screen if they may have diabetes as they may not have access to a doctor or a test during these unprecedented times. This by no chance should be used as replacement for an actual medical test, but just as an initial screen to help manage it if you may not have access to a doctor.</div>*/}
                    {(!context.stateLoggedIn) && <Link to={{
                            pathname: '/auth',
                            state: { detail: 'PREDICTOR' }
                        }} className='remove-link-styles'><button className='home-blue-button' style={{width: predictWidth}}>Go to Predictor</button>
                        </Link>}
                    {(context.stateLoggedIn) && <Link to='/predict' onClick={() => context.assignNavbarColor('Predictor')} className='remove-link-styles'><button className='home-blue-button' style={{width: predictWidth}}>Go to Predictor</button></Link>}
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
                    <h2 id='home-tracker-info' className='home-title home-subheading'>Keep track of <span className='home-title-orange'>your medical data.</span></h2>
                    {/*<div className='paragraph-font' style={{width: trackerWidth}}>Our tracker helps users to help track and manage their glucose and other medical data. This way they can keep track of any changes as during these times it is very easy to lose track of time and change. This track section will ensure users manage themselves and keep in control of their health.</div>*/}
                    {(!context.stateLoggedIn) && <Link to={{
                            pathname: '/auth',
                            state: { detail: 'TRACKER' }
                        }} className='remove-link-styles'><button className='home-orange-button' style={{width: trackerWidth}}>Go to Tracker</button>
                        </Link>}
                    {(context.stateLoggedIn) && <Link to='/track' onClick={() => context.assignNavbarColor('Tracker')} className='remove-link-styles'><button className='home-orange-button' style={{width: trackerWidth}}>Go to Tracker</button></Link>}
                </div>

                <div className='home-tracker-content-right'>
                    <img src={TrackerPreview} width={(context.stateIsMobile) ? '100%' : '80%'} />
                </div>

                
            </div>
    </Fragment>
    )
}

export default Home;
