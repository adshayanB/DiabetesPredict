import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { CSSTransition } from 'react-transition-group'; 
import {Alert} from 'react-bootstrap'
import '../css/Auth.css';

const Auth = () => {
    const [loginRegister, setLoginRegister] = useState(false);
    const [regNotification, setRegNotification] = useState([]);
    const [logNotification, setLogNotification] = useState([]);
    const [regShow, setRegShow] = useState(false);
    const [logShow, setLogShow] = useState(false);

    let gradientDisplay;
    let resizeTimer;
    let regNotificationDisplay;
    let logNotificationDisplay;

    window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
    });

    const assignRegNotif = (regNotif) => {
        setRegNotification(regNotif);
    }

    const assignLogNotif = (logNotif) => {
        setLogNotification(logNotif);
    }

    const regNotifClose = () => {
        setRegShow(true);
        setRegNotification([]);
    }

    const logNotifClose = () => {
        setLogShow(true);
        setLogNotification([]);
    }

    //Check for which screen the user is currently on (login or register)
    if (loginRegister) {
            gradientDisplay = ( <div className="gradient-display-background gradient-display-background-register">
                                    <div className='gradient-display gradient-display-register-rtrue'>
                                        <h1 className='gradient-display-text'>Already have an account?</h1>
                                        <button  onClick={() => setLoginRegister(false)} className='gradient-display-button gradient-display-button-red'>Login</button>
                                    </div>
                                    <div className='gradient-display gradient-display-register-bfalse'></div>
                                </div>);
    }

    else {
            gradientDisplay = ( <div className="gradient-display-background gradient-display-background-login">
                                    <div className='gradient-display gradient-display-login-rfalse'></div>
                                    <div className='gradient-display gradient-display-login-btrue'>
                                        <h1 className='gradient-display-text'>Don't have an account?</h1>
                                        <button onClick={() => setLoginRegister(true)} className='gradient-display-button gradient-display-button-blue'>Register</button>
                                    </div>
                                </div>);
    }

    //Show any registration notifications
    if (regNotification.length) {
        regNotificationDisplay = (  <Alert className='alert-align' variant={regNotification[2]} onClose={() => regNotifClose()} dismissible>
                                        <Alert.Heading>{regNotification[0]}</Alert.Heading>
                                        <p>{regNotification[1]}</p>
                                    </Alert>);
        (regShow !== true) && setRegShow(true);
    }

    if (logNotification.length) {
        logNotificationDisplay  = ( <Alert className='alert-align' variant={logNotification[2]} onClose={() => logNotifClose()} dismissible>
                                        <Alert.Heading>{logNotification[0]}</Alert.Heading>
                                        <p>{logNotification[1]}</p>
                                    </Alert>);
        (logShow !== true) && setLogShow(true);
    }


    return (
        <div className="auth-container">
            {gradientDisplay}

            <div className='fill'>
                
                
                <CSSTransition
                    in={loginRegister}
                    timeout={500}
                    classNames="reg-transition"
                    unmountOnExit
                >
                    <div className='auth-notification-container'>
                        {regShow && regNotificationDisplay}
                    </div>
                </CSSTransition>
                
                <CSSTransition
                    in={loginRegister}
                    timeout={500}
                    classNames="reg-transition"
                    unmountOnExit
                >
                    <Register assignRegNotif={(regNotif) => assignRegNotif(regNotif)}/>
                </CSSTransition>
            </div>
            <div className='fill'>
                
                <CSSTransition
                    in={!loginRegister}
                    timeout={500}
                    classNames="login-transition"
                    unmountOnExit
                >
                    <div className='auth-notification-container'>
                        {logShow && logNotificationDisplay}
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loginRegister}
                    timeout={500}
                    classNames="login-transition"
                    unmountOnExit
                >
                    <Login assignLogNotif={(logNotif) => assignLogNotif(logNotif)}/>
                </CSSTransition>
            </div>
            
        </div>
    )
}

export default Auth;
