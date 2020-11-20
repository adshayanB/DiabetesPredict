import React, { useState, useEffect } from 'react';
import '../css/Register.css';
import Lottie from 'react-lottie';
import loadingData from '../lotties/loading';

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

    const [firstNameShake, setFirstNameShake] = useState('');
    const [lastNameShake, setLastNameShake] = useState('');
    const [emailShake, setEmailShake] = useState('');
    const [phoneNumberShake, setPhoneNumberShake] = useState('');
    const [passwordShake, setPasswordShake] = useState('');

    const [loading, setLoading] = useState(false);

    let regFormPage;
    let passwordType;
    let confirmPasswordType;
    let showPasswordIcon;
    let showConfirmPasswordIcon;
    let showHiddenDiv;

    let firstNameBorder = 'border-normal';
    let lastNameBorder = 'border-normal';
    let emailBorder = 'border-normal';
    let phoneNumberBorder = 'border-normal';
    let passwordBorder = 'border-normal';
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      
    const handleNameNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(1);
        clearShake();
    }

    const handleEmailNext = (e) => {
        e.preventDefault();
        setNameEmailPassword(2);
        clearShake();
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);
        setSubmittedOnce(true);
        errorCheckSubmit();

        if (firstNameError || lastNameError || emailError || phoneNumberError || passwordError) {
            setLoading(false);
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
                password,
                confirmPassword
            })
        })

        const json = await response.json();
        console.log(json);

        props.assignAuthEmail(email);
        setLoading(false);

        if (json.message === 'User Created') {
            props.assignRegNotif(['Registration Successful!', `Thank you for registering ${firstName}, please verify your account by clicking the verification link sent to your email.`, 'success']);
        }

        else if (json.message === 'A user with this email already exists.') {
            props.assignRegNotif(['Email already in use!',`A user with the email ${email} already exists. Please use another email.`, 'danger']);
        }
    }

    const validateEmail = address => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(address);
    }

    const isNumber = phone => {
        return /^\d*$/.test(phone);
    }

    const clearShake = () => {
        (passwordShake !== '') && setPasswordShake('');
        (emailShake !== '') && setEmailShake('');
        (phoneNumberShake !== '') && setPhoneNumberShake('');
        (firstNameShake !== '') && setFirstNameShake('');
        (lastNameShake !== '') && setLastNameShake('');
    }

    



/////////////// FRONTEND ERROR-CHECKING ////////////////////
const errorCheckSubmit = () => {
    //Check for Password and Confirm Password errors
    if ((password === '')){
        setPasswordError('A password is required');
        setNameEmailPassword(2);
        setPasswordShake('shake-error');
    }

    else if ((password.length < 8)) {
        setPasswordError('The password must be at least 8 characters long');
        setNameEmailPassword(2);
        setPasswordShake('shake-error');
    }

    else if ((password !== confirmPassword)){
        setPasswordError('The passwords do not match');
        setNameEmailPassword(2);
        setPasswordShake('shake-error');
    }
    else {
        setPasswordError('');
        setPasswordShake('');
    }

    
    //Check for Email errors
    if ((email === '')){
        setEmailError('An email is required');
        setNameEmailPassword(1);
        setEmailShake('shake-error');
    }
    else if ((!validateEmail(email))) {
        setEmailError('You have entered an invalid email');
        setNameEmailPassword(1);
        setEmailShake('shake-error');
    }
    else {
        setEmailError('');
        setEmailShake('');
    }

    //Check for Phone Number (optional) errors
    if (!isNumber(phoneNumber)) {
        setPhoneNumberError('The phone number may only contain numbers');
        setNameEmailPassword(1);
        setPhoneNumberShake('shake-error');
    }
    else {
        setPhoneNumberError('');
        setPhoneNumberShake('');
    }

    //Check for First Name errors
    if ((firstName === '')){
        setFirstNameError('A first name is required');
        setNameEmailPassword(0);
        setFirstNameShake('shake-error');
    } 
    else {
        setFirstNameError('');
        setFirstNameShake('');
    }

    //Check for Last Name errors
    if ((lastName === '')){
        setLastNameError('A last name is required');
        setNameEmailPassword(0);
        setLastNameShake('shake-error');
    }
    else {
        setLastNameError('');
        setLastNameShake('');
    }
    
    
}

const errorCheckRender = () => {
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
}

errorCheckRender();

//Decides whether the password is currently shown or not
if (showPassword) {
    showPasswordIcon = (
        <div className={`hide-password ${passwordShake}`} onClick={() => setShowPassword(false)}></div>
    );

    passwordType = 'text';
} else {
    showPasswordIcon = (
        <div className={`show-password ${passwordShake}`} onClick={() => setShowPassword(true)}></div>
    );

    passwordType = 'password';
}

 //Decides whether the confirm password is currently shown or not
 if (showConfirmPassword) {
    showConfirmPasswordIcon = (
        <div className={`hide-password ${passwordShake}`} onClick={() => setShowConfirmPassword(false)}></div>
    );

    confirmPasswordType = 'text';
} else {
    showConfirmPasswordIcon = (
        <div className={`show-password ${passwordShake}`} onClick={() => setShowConfirmPassword(true)}></div>
    );

    confirmPasswordType = 'password';
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
                <h5 className='input-error-message'>{(submittedOnce) ? firstNameError : null}</h5>
                <input className={`register-form-item register-input ${(submittedOnce) ? firstNameBorder: 'border-normal'} ${firstNameShake}`} value={firstName} type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                <h5 className='input-error-message'>{(submittedOnce) ? lastNameError : null}</h5>
                <input className={`register-form-item register-input ${(submittedOnce) ? lastNameBorder: 'border-normal'} ${lastNameShake}`} value={lastName} type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
                <div className='submission-buttons'>
                    <button className='register-form-item register-button' type='submit'>Next</button>
                </div>
            </form>
        );
    }

    else if (nameEmailPassword === 1) {
        regFormPage = (
            <form className='register-form' onSubmit={handleEmailNext}>
                <h5 className='input-error-message'>{(submittedOnce) ? emailError : null}</h5>
                <input className={`register-form-item register-input ${(submittedOnce) ? emailBorder: 'border-normal'} ${emailShake}`} value={email} type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <h5 className='input-error-message'>{(submittedOnce) ? phoneNumberError : null}</h5>
                <input className={`register-form-item register-input ${(submittedOnce) ? phoneNumberBorder: 'border-normal'} ${phoneNumberShake}`} value={phoneNumber} type='text' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)}/>
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
                <h5 className='input-error-message'>{(submittedOnce) ? passwordError : null}</h5>
                <div className='password-container'>
                    <input className={`password-item register-input ${(submittedOnce) ? passwordBorder: 'border-normal'} ${passwordShake}`} type={passwordType} value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    {showPasswordIcon}
                </div>
                <div className='password-container'>
                    <input className={`password-item register-input ${(submittedOnce) ? passwordBorder: 'border-normal'} ${passwordShake}`} type={confirmPasswordType} value={confirmPassword} placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)}/>
                    {showConfirmPasswordIcon}
                </div>
                {showHiddenDiv}
                <div className='submission-buttons'>
                    <button className='register-form-item back-button' type='button' onClick={() => setNameEmailPassword(1)}>Back</button>
                    <div className='register-form-item'></div>
                    <button className='register-form-item register-button' type='submit' disabled={loading}>
                        {!loading && 'Sign up'}
                        {loading && <Lottie options={defaultOptions} height={75} width={75}></Lottie>}
                    </button>
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
