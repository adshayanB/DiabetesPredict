import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { CSSTransition } from 'react-transition-group'; 
import '../css/Auth.css';

const Auth = () => {
    const [loginRegister, setLoginRegister] = useState(false);
    let gradientDisplay;
    let resizeTimer;

    window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
    });

    const assignLoginRegister = (loginRegisterState) => {
        setLoginRegister(loginRegisterState);
    }

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
                    <Register assignLoginReg={(loginRegisterState) => assignLoginRegister(loginRegisterState)}/>
                </CSSTransition>
            </div>
            <div className='fill'>
                <CSSTransition
                    in={!loginRegister}
                    timeout={500}
                    classNames="login-transition"
                    unmountOnExit
                >
                    <Login assignLoginReg={(loginRegisterState) => assignLoginRegister(loginRegisterState)}/>
                </CSSTransition>
            </div>
            
        </div>
    )
}

export default Auth;
