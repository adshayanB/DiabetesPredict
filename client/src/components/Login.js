import React, { useState } from 'react';
import '../css/Login.css';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        //Enter authentication code here to validate user credentials
    }

    //Password field should be secured and should not be openly updated in state

    return (
        <div className='login-container'>
            <h1 className='welcome-message'>Welcome</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input className='login-form-item login-input' type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input className='login-form-item login-input' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <button className='login-form-item login-button' type='submit'>Sign in</button>
            </form>
            <h3 className='forgot-password'>Forgot your password?</h3>
        </div>
    )
}

export default Login;