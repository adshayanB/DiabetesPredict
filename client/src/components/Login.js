import React, { useState, useContext, useEffect } from 'react';
import '../css/Login.css';
import Context from '../utils/context'

const Login = (props) => {
    const context = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let showPasswordIcon;
    let passwordType;


    const handleSubmit = async e => {
        e.preventDefault();
        let response;
        let json;
        //Perform front-end form validation before sending to posting to back-end
        

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
        console.log(json);

        if (json.token){
            response = await fetch('/api/user', {headers: { 'x-access-tokens': json.token}});
            json = await response.json();
            console.log(json.firstName);
            setFName(', ' + json.firstName);
            setLName(json.lastName);
            props.assignLogNotif([]);
        } else {
            props.assignLogNotif(['', json.message, 'danger']);
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
                <button className='login-form-item login-button' type='submit'>Sign in</button>
            </form>
            <h5 className='forgot-password'>Forgot your password?</h5>
        </div>
    )
}

export default Login;