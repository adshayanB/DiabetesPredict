import React, { useState } from 'react';
import '../css/Register.css';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [nameEmailPassword, setNameEmailPassword] = useState(0);

    let regFormPage;
    
    
    const handleNameNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(1);
    }

    const handleEmailNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(2);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                healthCard: '',
                phoneNumber,
                password
            })
        })

        const json = await response.json();
        console.log(json);
    }


    if (nameEmailPassword === 0) {
        regFormPage = (
            <form className='register-form' onSubmit={handleNameNext}>
                <input className='register-form-item register-input' value={firstName} type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                <input className='register-form-item register-input' value={lastName} type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item register-button' type='submit'>Next</button>
                </div>
            </form>
        );
    }

    else if (nameEmailPassword === 1) {
        regFormPage = (
            <form className='register-form' onSubmit={handleEmailNext}>
                <input className='register-form-item register-input' value={email} type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input className='register-form-item register-input' value={phoneNumber} type='text' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)}/>
                <div></div>
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
                <input className='register-form-item register-input' value={password} type='text' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <input className='register-form-item register-input' value={confirmPassword} type='text' placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)}/>
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
