import React, { useState } from 'react';
import '../css/Register.css';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //Enter authentication code here to validate user credentials
    }

     //Password field should be secured and should not be openly updated in state

    return (
        <div className='register-container'>
            <h1 className='welcome-message'>Create account</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <input className='register-form-item register-input' type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input className='register-form-item register-input' type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input className='register-form-item register-input' type='text' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <input className='register-form-item register-input' type='text' placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)}/>
                <button className='register-form-item register-button' type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default Register;
