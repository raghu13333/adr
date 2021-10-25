import React from "react";
import {  BrowserRouter } from "react-router-dom";

import '../App.css'
class SideBar extends React.Component {
  state = { active: !this.props.open || true };

  render = () => {
 

    return (
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>Dhvani ADR</h3>
        </div>
            <BrowserRouter>
        <ul class="list-unstyled components">
        
          <li class="">
            <a
              href="/"
              data-toggle="collapse"
              aria-expanded="false"
              
            >
             Upload
            </a>
            
          </li>
          <li>
          <a
              href="/inference"
              data-toggle="collapse"
              aria-expanded="false"
              
            >
              Inference
            </a>
          </li>
          
         
        </ul>
        </BrowserRouter>
      </nav>
    );
  };
}

export default SideBar;
