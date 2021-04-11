import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login/Login';
import Main from './Main/Main';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/main" component={Main}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

  