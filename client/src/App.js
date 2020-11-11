import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Context from './utils/context';
import Home from './components/Home';
import PredictorForm from './components/PredictorForm';
import Result from './components/Result';

function App() {
  const [prediction, setPrediction] = useState(false);

  const assignPrediction = (pred) => {
    setPrediction(pred)
  }
  
  return (
    <Context.Provider value = {{
      statePrediction: prediction,
      assignPredictionFunction: (pred) => assignPrediction(pred)
    }}>
      <Router>
        <div className="App">
          <h1>Diabetes Predictor</h1>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/predict' component={PredictorForm}/>
            <Route exact path='/results' component={Result}/>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
