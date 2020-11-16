import React, { useState } from 'react';
import '../css/Register.css';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [nameEmailPassword, setNameEmailPassword] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [submittedOnce, setSubmittedOnce] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    let regFormPage;
    let passwordType;
    let confirmPasswordType;
    let showPasswordIcon;
    let showConfirmPasswordIcon;

    let firstNameBorder = 'border-normal';
    let lastNameBorder = 'border-normal';
    let emailBorder = 'border-normal';
    let phoneNumberBorder = 'border-normal';
    let passwordBorder = 'border-normal';
    
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

        setSubmittedOnce(true);
        setSubmitted(true);

        if (firstNameError || lastNameError || emailError || phoneNumberError || passwordError) {
            return;
        }

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

    const validateEmail = address => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(address);
    }

    const isNumber = phone => {
        return /^\d*$/.test(phone);
    }

    //Decides whether the password is currently shown or not
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


    //Decides whether the confirm password is currently shown or not
    if (showConfirmPassword) {
        showConfirmPasswordIcon = (
            <div className='hide-password' onClick={() => setShowConfirmPassword(false)}></div>
        );

        confirmPasswordType = 'text';
    } else {
        showConfirmPasswordIcon = (
            <div className='show-password' onClick={() => setShowConfirmPassword(true)}></div>
        );

        confirmPasswordType = 'password';
    }



/////////////// FRONTEND ERROR-CHECKING ////////////////////

    //Check for Password and Confirm Password errors
    if ((password === '')){
        (passwordError !== 'A password is required') && setPasswordError('A password is required');
    }

    else if ((password.length < 8)) {
        (passwordError !== 'The password must be at least 8 characters long') && setPasswordError('The password must be at least 8 characters long');
    }

    else if ((password !== confirmPassword)){
        (passwordError !== 'The passwords do not match') && setPasswordError('The passwords do not match');
    }
    else {
        (passwordError !== '') && setPasswordError('');
    }

    
    //Check for Email errors
    if ((email === '')){
        (emailError !== 'An email is required') && setEmailError('An email is required');
    }
    else if ((!validateEmail(email))) {
        (emailError !== 'You have entered an invalid email') && setEmailError('You have entered an invalid email');
    }
    else {
        (emailError !== '') && setEmailError('');
    }

    //Check for Phone Number (optional) errors
    if (!isNumber(phoneNumber)) {
        (phoneNumberError !== 'The phone number may only contain numbers') && setPhoneNumberError('The phone number may only contain numbers');
    }
    else {
        (phoneNumberError !== '') && setPhoneNumberError('');
    }

    //Check for First Name errors
    if ((firstName === '')){
        (firstNameError !== 'A first name is required') && setFirstNameError('A first name is required');
    } 
    else {
        (firstNameError !== '') && setFirstNameError('');
    }

    //Check for Last Name errors
    if ((lastName === '')){
        (lastNameError !== 'A last name is required') && setLastNameError('A last name is required');
    }
    else {
        (lastNameError !== '') && setLastNameError('');
    }

    //Change register form to the first known error
    if ((firstNameError || lastNameError) && submitted) {
        (nameEmailPassword !== 0) && setNameEmailPassword(0);
        setSubmitted(false);
    }
    else if ((emailError || phoneNumberError) && submitted) {
        (nameEmailPassword !== 1) && setNameEmailPassword(1);
        setSubmitted(false);
    }
    else if (passwordError && submitted) {
        (nameEmailPassword !==2) && setNameEmailPassword(2);
        setSubmitted(false);
    }

    //Set error borders on inputs
    if (firstNameError) {
        firstNameBorder = 'border-error';
    }

    if (lastNameError) {
        lastNameBorder = 'border-error';
    }

    if (emailError) {
        emailBorder = 'border-error';
    }

    if (phoneNumberError) {
        phoneNumberBorder = 'border-error';
    }

    if (passwordError) {
        passwordBorder = 'border-error';
    }
////////////////////////////////////////////////////////////
    

    if (nameEmailPassword === 0) {
        regFormPage = (
            <form className='register-form' onSubmit={handleNameNext}>
                <h3 className='input-error-message'>{(submittedOnce) ? firstNameError : null}</h3>
                <input className={`register-form-item register-input ${(submittedOnce) ? firstNameBorder: 'border-normal'}`} value={firstName} type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                <h3 className='input-error-message'>{(submittedOnce) ? lastNameError : null}</h3>
                <input className={`register-form-item register-input ${(submittedOnce) ? lastNameBorder: 'border-normal'}`} value={lastName} type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item register-button' type='submit'>Next</button>
                </div>
            </form>
        );
    }

    else if (nameEmailPassword === 1) {
        regFormPage = (
            <form className='register-form' onSubmit={handleEmailNext}>
                <h3 className='input-error-message'>{(submittedOnce) ? emailError : null}</h3>
                <input className={`register-form-item register-input ${(submittedOnce) ? emailBorder: 'border-normal'}`} value={email} type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <h3 className='input-error-message'>{(submittedOnce) ? phoneNumberError : null}</h3>
                <input className={`register-form-item register-input ${(submittedOnce) ? phoneNumberBorder: 'border-normal'}`} value={phoneNumber} type='text' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)}/>
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
                <h3 className='input-error-message'>{(submittedOnce) ? passwordError : null}</h3>
                <div className='password-container'>
                    <input className={`password-item register-input ${(submittedOnce) ? passwordBorder: 'border-normal'}`} type={passwordType} value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    {showPasswordIcon}
                </div>
                <div className='password-container'>
                    <input className={`password-item register-input ${(submittedOnce) ? passwordBorder: 'border-normal'}`} type={confirmPasswordType} value={confirmPassword} placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)}/>
                    {showConfirmPasswordIcon}
                </div>
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
