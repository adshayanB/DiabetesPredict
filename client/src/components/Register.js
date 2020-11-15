import React, { useState } from 'react';
import '../css/Register.css';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameEmailPassword, setNameEmailPassword] = useState(0);

    let regFormPage;
    
    
    const handleNameNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(1);
        //Enter authentication code here to validate user credentials
    }

    const handleEmailNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(2);
        //Enter authentication code here to validate user credentials
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Enter authentication code here to validate user credentials
    }


    if (nameEmailPassword === 0) {
        regFormPage = (
            <form className='register-form' onSubmit={handleNameNext}>
                <input className='register-form-item register-input' type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                <input className='register-form-item register-input' type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item register-button' type='submit'>Next</button>
                </div>
            </form>
        );
    }

    else if (nameEmailPassword === 1) {
        regFormPage = (
            <form className='register-form' onSubmit={handleEmailNext}>
                <input className='register-form-item register-input' type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item back-button' type='button' onClick={() => setNameEmailPassword(0)}>Back</button>
                    <div className='register-form-item'></div>
                    <button className='register-form-item register-button' type='submit'>Next</button>
                </div>
            </form>
        );
    }

    else {
        regFormPage = (
            <form className='register-form' onSubmit={handleSubmit}>
                <input className='register-form-item register-input' type='text' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <input className='register-form-item register-input' type='text' placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item back-button' type='button' onClick={() => setNameEmailPassword(1)}>Back</button>
                    <div className='register-form-item'></div>
                    <button className='register-form-item register-button' type='submit'>Sign up</button>
                </div>
            </form>
        );
    }
     //Password field should be secured and should not be openly updated in state

    return (
        <div className='register-container'>
            <h1 className='welcome-message'>Create account</h1>
            {regFormPage}
        </div>
    )
}

export default Register;
