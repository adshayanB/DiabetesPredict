import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Lottie from 'react-lottie';
import { CSSTransition } from 'react-transition-group'; 
import {Alert, Button} from 'react-bootstrap'
import loadingData from '../lotties/loading';
import '../css/Auth.css';

const Auth = (props) => {
    const [loginRegister, setLoginRegister] = useState(false);
    const [regNotification, setRegNotification] = useState([]);
    const [logNotification, setLogNotification] = useState([]);
    const [regShow, setRegShow] = useState(false);
    const [logShow, setLogShow] = useState(false);
    const [authEmail, setAuthEmail] = useState('');
    const [loading, setLoading] = useState(false);

    let gradientDisplay;
    let resizeTimer;
    let regNotificationDisplay;
    let logNotificationDisplay;

    useEffect(async() => {
        const { token } = props.match.params;
        let response;
        let json;
        if (token){
            response = await fetch(`/api/confirm_email/${token}`);
            json = await response.json();

            if (json.message === 'token_expired') {
                setLogNotification(['Verification Token Expired!', 'Your verification token session has expired. Please press Resend to send another verification link to your email.', 'danger']);
                setLogShow(true);
            }
            else if (json.message === 'email_already_confirmed') {
                setLogNotification(['Account already verified!', 'You have already verified this account.', 'warning']);
                setLogShow(true);
            }
            else if (json.message === 'email_confirm_success') {
                setLogNotification(['Account verified successfully!', 'Thank you for verifying your account. You may now log in.', 'success']);
                setLogShow(true);
            }
        }
    }, []);

    window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
    });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const assignAuthEmail = (email) => {
        setAuthEmail(email);
    }

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

    const handleResendTokenReg = async() => {
        let response;
        let json;

        setLoading(true);

        response = await fetch('/api/resendToken', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authEmail
            })
        })

        json = await response.json();

        setLoading(false);


    }

    const handleResendTokenLog = async() => {

    }

    //Check for which screen the user is currently on (login or register)
    if (loginRegister) {
            gradientDisplay = ( <div className="gradient-display-background gradient-display-background-register">
                                    <div className='gradient-display gradient-display-register-rtrue'>
                                        <h1 className='gradient-display-text'>Already have an account?</h1>
                                        <button  onClick={() => {
                                            setRegShow(false);
                                            setRegNotification([]);
                                            setLoginRegister(false)}} className='gradient-display-button gradient-display-button-red'>Login</button>
                                    </div>
                                    <div className='gradient-display gradient-display-register-bfalse'></div>
                                </div>);
    }

    else {
            gradientDisplay = ( <div className="gradient-display-background gradient-display-background-login">
                                    <div className='gradient-display gradient-display-login-rfalse'></div>
                                    <div className='gradient-display gradient-display-login-btrue'>
                                        <h1 className='gradient-display-text'>Don't have an account?</h1>
                                        <button onClick={() => {
                                            setLogShow(false);
                                            setLogNotification([]);
                                            setLoginRegister(true)}} className='gradient-display-button gradient-display-button-blue'>Register</button>
                                    </div>
                                </div>);
    }

    //Show any registration notifications
    if (regNotification.length) {
        regNotificationDisplay = (  <Alert className='alert-align' variant={regNotification[2]} onClose={() => regNotifClose()} dismissible>
                                        <Alert.Heading>{regNotification[0]}</Alert.Heading>
                                        <p>{regNotification[1]}</p>
                                        {(regNotification[0] === 'Registration Successful!') && (<div className="d-flex justify-content-end">
                                            <Button onClick={() => handleResendTokenReg()} variant="outline-success" disabled={loading}>
                                                {!loading && 'Resend'}
                                                {loading && <Lottie options={defaultOptions} height={35} width={35}></Lottie>}
                                            </Button>
                                        </div>)}
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
                    <Register assignRegNotif={(regNotif) => assignRegNotif(regNotif)}
                              assignAuthEmail={(email) => assignAuthEmail(email)}/>
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
