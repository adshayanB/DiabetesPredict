import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Context from './utils/context';
import Home from './components/Home';
import PredictorForm from './components/PredictorForm';
import Result from './components/Result';
import Auth from './components/Auth';

function App() {
  const [prediction, setPrediction] = useState(false);
  const [token, setToken] = useState();

  const assignPrediction = (pred) => {
    setPrediction(pred);
  }

  const assignToken = (token) => {
    setToken(token);
  }
  
  return (
    <Context.Provider value = {{
      statePrediction: prediction,
      assignPredictionFunction: (pred) => assignPrediction(pred),
      stateToken: token,
      assignTokenFunction: (token) => assignToken(token)
    }}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/predict' component={PredictorForm}/>
            <Route exact path='/results' component={Result}/>
            <Route exact path='/auth/:token?' component={Auth}/>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
