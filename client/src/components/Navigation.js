import React, { useState, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../css/Navigation.css';
import Context from '../utils/context';

const Navigation = () => {
    const context = useContext(Context);
    const [navbarColor, setNavbarColor] = useState('Home');
    let rightNav;

    const getUserInfo = async () => {
        let response = await fetch('/api/user', {headers: { 'x-access-tokens': localStorage.getItem('token')}});
        let json = await response.json();
        context.assignFName(json.firstName);
        context.assignLName(json.lastName);
    }
    const signoutUser = () => {
        localStorage.removeItem('token');
        context.assignFName('');
        context.assignLName('');
    }

    if (localStorage.getItem('token')) {
        if (context.stateFName === '' && context.stateLName === '') {
            getUserInfo();
        }
        rightNav = (<Fragment>
                        <NavDropdown alignRight title={`Welcome, ${context.stateFName} ${context.stateLName}`} id="collasible-nav-dropdown" className='navbar-profile-dropdown'>
                            <NavDropdown.Item onClick={() => signoutUser()}>
                                Sign out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Fragment>);
    } else {
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
    

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" className='navbar-c'>
            <Navbar.Brand>
                <Link to='/' onClick={() => setNavbarColor('Home')} className='navbar-item-c navbar-item-width-height navbar-title'>
                    Diabetes Doctor
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className='m-auto'>
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
    )
}
export default Navigation