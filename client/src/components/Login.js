import React, { useState, useContext, useEffect } from 'react';
import '../css/Login.css';
import Context from '../utils/context'
import Lottie from 'react-lottie';
import loadingData from '../lotties/loading';

const Login = (props) => {
    const context = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    let showPasswordIcon;
    let passwordType;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const handleSubmit = async e => {
        
        e.preventDefault();
        let response;
        let json;

        setLoading(true);

        //Post email and password to back end and get authenticated
        response = await fetch('/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        json = await response.json();
        context.assignTokenFunction(json.token);


        if (json.token){
            response = await fetch('/api/user', {headers: { 'x-access-tokens': json.token}});
            json = await response.json();
            setLoading(false);
            setFName(', ' + json.firstName);
            setLName(json.lastName);
            props.assignLogNotif([]);
        } else if (json.message === 'User is not verified'){
            setLoading(false)
            props.assignAuthEmail(email);
            props.assignLogNotif(['Account not verified!', 'This account has not yet been verified. If you are the owner of this account and did not recieve a verification email, please click Resend to send another verification link to your email.', 'warning']);
        } else if (json.message === 'A user with this email does not exist.') {
            setLoading(false)
            props.assignLogNotif(['Account not found!', 'A user with this email does not exist.', 'danger']);
        } else if (json.message === 'Your email or password is incorrect') {
            setLoading(false)
            props.assignLogNotif(['Invalid Credentials!', 'Your email or password is incorrect.', 'danger']);
        }
        
    }

    if (showPassword) {
        showPasswordIcon = (
            <div className='hide-password' onClick={() => setShowPassword(false)}></div>
        );

        passwordType = 'text';
    } else {
        showPasswordIcon = (
            <div className='show-password' onClick={() => setShowPassword(true)}></div>
        );

        passwordType = 'password';
    }

    //Password field should be secured and should not be openly updated in state

    return (
        <div className='login-container'>
            <h1 className='welcome-message'>Welcome{fName} {lName}</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input className='login-form-item login-input' type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <div className='password-container'>
                    <input className='password-item login-input' type={passwordType} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    {showPasswordIcon}
                </div>
                <button className='login-form-item login-button' type='submit' disabled={loading}>
                    {!loading && 'Sign in'}
                    {loading && <Lottie options={defaultOptions} height={75} width={75}></Lottie>}
                </button>
                
            </form>
            <h5 className='forgot-password'>Forgot your password?</h5>
        </div>
    )
}

export default Login;