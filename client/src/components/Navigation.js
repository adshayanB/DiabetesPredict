import React, { useState, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Wave from 'react-wavify';
import '../css/Navigation.css';
import Context from '../utils/context';

const Navigation = () => {
    const context = useContext(Context);
    const [navbarColor, setNavbarColor] = useState('Home');
    let rightNav;

    const getUserInfo = async () => {
        let response = await fetch('/api/user', {headers: { 'x-access-tokens': localStorage.getItem('token')}});
        let json = await response.json();
        if (json.message === 'Token is invalid' || json.message === 'Token is missing') {
            console.log(json.message);
            return 0;
        } else {
            context.assignFName(json.firstName);
            context.assignLName(json.lastName);
            return 1;
        }
    }
    const signoutUser = () => {
        localStorage.removeItem('token');
        context.assignFName('');
        context.assignLName('');
    }

    const setRightNavToWelcome = () => {
        rightNav = (<Fragment>
            <Nav.Link>
                <Link to="/auth/register" onClick={() => setNavbarColor('Home')} className="navbar-item-button-c">
                    <button className='navbar-signup-c'>Sign up</button>
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/auth/login" onClick={() => setNavbarColor('Home')} className="navbar-item-button-c">
                    <button className='navbar-signin-c'>Sign in</button>
                </Link>
            </Nav.Link>
        </Fragment>);
    }

    const setRightNavToLoginSignup = () => {
        rightNav = (<Fragment>
            <NavDropdown alignRight title={`Welcome, ${context.stateFName} ${context.stateLName}`} id="collasible-nav-dropdown" className='navbar-profile-dropdown'>
                <NavDropdown.Item onClick={() => signoutUser()}>
                    Sign out
                </NavDropdown.Item>
            </NavDropdown>
        </Fragment>);
    }

    if (localStorage.getItem('token')) {
        let result;

        if (context.stateFName === '' && context.stateLName === '') {
            result = getUserInfo();
        } else{
            result = 1;
        }

        if (result) {
            setRightNavToLoginSignup();
        } else {
            setRightNavToWelcome();
        }
    } else {
        setRightNavToWelcome();
    }
    

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" className='navbar-c'>
                <Navbar.Brand>
                    <Link to='/' onClick={() => setNavbarColor('Home')} className='navbar-item-c navbar-item-width-height navbar-title'>
                        Diabetes Doctor
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='m-auto navbar-item-font'>
                        <Nav.Link>
                            <Link to='/predict' onClick={() => setNavbarColor('Predictor')} className={`navbar-item-c navbar-item-width-height ${(navbarColor === 'Predictor') ? 'navbar-selected' : 'navbar-item-normal'}`}>
                                Predictor
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/track' onClick={() => setNavbarColor('Tracker')} className={`navbar-item-c navbar-item-width-height ${(navbarColor === 'Tracker') ? 'navbar-selected' : 'navbar-item-normal'}`}>
                                Tracker
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {rightNav}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Wave fill='#fff'
                paused={false}
                className='navbar-wave navbar-wave-1'
                options={{
                height: 15,
                amplitude: 20,
                speed: 0.15,
                points: 4
                }}
            />

            <Wave fill='#f6f6f6'
                paused={false}
                className='navbar-wave navbar-wave-2'
                options={{
                height: 20,
                amplitude: 25,
                speed: 0.15,
                points: 3
                }}
            />
        </div>
    )
}
export default Navigation