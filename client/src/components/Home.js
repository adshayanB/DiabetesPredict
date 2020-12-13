import React, { useLayoutEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Context from '../utils/context';
import Wave from 'react-wavify';
import '../css/Home.css';
import Backvideo from "../videos/medical_background_video_12s_loop.mp4";

const Home = () => {
    const context = useContext(Context);

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);
    
    return (
        <Fragment>
            <div className='home-page-main-container'>
                <video autoPlay loop muted
                    style={{
                        position: 'absolute',
                        width: '100%',
                        left:'50%',
                        top:'50%',
                        height:'800px',
                        objectFit: 'cover',
                        transform:'translate(-50%, -50%)',
                        zIndex: '-2'
                    }}>
                    <source src={Backvideo} type="video/mp4"/>
                </video>
                <div className='home-black-tint'></div>
            </div>
            <div className='home-predict-info-container'>
            <Wave fill='#fff'
                paused={false}
                className='home-wave home-wave-1'
                options={{
                height: 15,
                amplitude: 20,
                speed: 0.15,
                points: 4
                }}
            />

            <Wave fill='#f6f6f6'
                paused={false}
                className='home-wave home-wave-2'
                options={{
                height: 20,
                amplitude: 25,
                speed: 0.15,
                points: 3
                }}
            />
        </div>
    </Fragment>
    )
}

export default Home;
