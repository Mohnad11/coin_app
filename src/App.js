import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom'
import WebSocketPage from "./Pages/WebSocketPage";
import RestApiPage from "./Pages/RestApiPage";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={WebSocketPage}/>
          <Route path="/api" exact component={RestApiPage}/>
        </Switch>
    </div>
  );
}

export default App;
