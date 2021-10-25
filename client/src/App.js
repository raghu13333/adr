import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import SideBar from "./components/Sidebar";

import Apps from './components/login'
import Inference from './components/inference';
class App extends Component {
  render() {
    return (
      <div className="App">
             <Router>
        <div className="wrapper">
          <SideBar  />
          
           
            <Route exact path="/home" component={Home} />
          
          <Route exact path="/inference" component={Inference} />
          <Route exact path="/" component={Apps} />
 
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
