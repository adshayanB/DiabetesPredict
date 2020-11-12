import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../css/Auth.css';

const Auth = () => {
    const [loginRegister, setLoginRegister] = useState(false);
    let gradientDisplay;

    const assignLoginRegister = (loginRegisterState) => {
        setLoginRegister(loginRegisterState);
    }

    if (loginRegister) {
            gradientDisplay = <div className="gradient-display-background gradient-display-background-register"><div className='gradient-display gradient-display-register-rtrue'><h1 className='gradient-display-text'>Already have an account?</h1><button  onClick={() => setLoginRegister(false)} className='gradient-display-button gradient-display-button-red'>Login</button></div><div className='gradient-display gradient-display-register-bfalse'></div></div>;
    }

    else {
            gradientDisplay = <div className="gradient-display-background gradient-display-background-login"><div className='gradient-display gradient-display-login-rfalse'></div><div className='gradient-display gradient-display-login-btrue'><h1 className='gradient-display-text'>Don't have an account?</h1><button onClick={() => setLoginRegister(true)} className='gradient-display-button gradient-display-button-blue'>Register</button></div></div>;
    }

    return (
        <div className="auth-container">
            {gradientDisplay}
            <Register assignLoginReg={(loginRegisterState) => assignLoginRegister(loginRegisterState)}/>
            <Login assignLoginReg={(loginRegisterState) => assignLoginRegister(loginRegisterState)}/>
        </div>
    )
}

export default Auth;
