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

function App() {
  const [prediction, setPrediction] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [token, setToken] = useState();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

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
      assignLName: (lastname) => assignLName(lastname)
    }}>
      <Router>
        <div className="App">
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
