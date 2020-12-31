import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Context from './utils/context';
import Home from './components/Home';
import Predictor from './components/Predictor';
import Result from './components/Result';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Tracker from './components/Tracker';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [prediction, setPrediction] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [token, setToken] = useState();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbarColor, setNavbarColor] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
        !isMobile && setIsMobile(true);
    } else {
        isMobile && setIsMobile(false);
    }
  });

  const assignPrediction = (pred) => {
    setPrediction(pred);
  }

  const assignToken = (token) => {
    setToken(token);
  }
  
  const assignShowNav = (show) => {
    setShowNav(show);
  }

  const assignFName = (firstname) => {
    setFName(firstname);
  }

  const assignLName = (lastname) => {
    setLName(lastname);
  }

  const assignLoggedIn = (login) => {
    setLoggedIn(login);
  }

  const assignNavbarColor = (color) => {
    setNavbarColor(color);
  }

  const assignIsMobile = (mobile) => {
    setIsMobile(mobile);
  }
  
  return (
    <Context.Provider value = {{
      statePrediction: prediction,
      assignPredictionFunction: (pred) => assignPrediction(pred),
      stateToken: token,
      assignTokenFunction: (token) => assignToken(token),
      stateNav: showNav,
      assignShowNav: (show) => assignShowNav(show),
      stateFName: fName,
      assignFName: (firstname) => assignFName(firstname),
      stateLName: lName,
      assignLName: (lastname) => assignLName(lastname),
      stateLoggedIn: loggedIn,
      assignLoggedIn: (login) => assignLoggedIn(login),
      stateNavbarColor: navbarColor,
      assignNavbarColor: (color) => assignNavbarColor(color),
      stateIsMobile: isMobile,
      assignIsMobile: (mobile) => assignIsMobile(mobile)
    }}>
      <Router>
        <div className="App">
          <ScrollToTop />
          {(showNav) && <Navigation />}
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/predict' component={Predictor}/>
            <Route exact path='/track' component={Tracker}/>
            <Route exact path='/results' component={Result}/>
            <Route exact path='/auth/:token?' component={Auth}/>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
