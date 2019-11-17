import React, { Component } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';

export default class NavBar extends Component {
  render() {
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Cars Rental</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="http://localhost:8000/rental/home/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:8000/rental/my_reservation/">My Reservation</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="http://localhost:8000/rental/admin_loc/">Locations</a>
                <a class="dropdown-item" href="http://localhost:8000/rental/admin_cat/">Categories</a>
                <a class="dropdown-item" href="http://localhost:8000/rental/admin_res/">Reservations</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:8000/rental/reserve/">Reserve</a>
            </li>
          </ul>
        </div>
        </nav>
      );
  }
}

if(document.getElementById('navbar')){
	ReactDOM.render(<NavBar />, document.getElementById('navbar'));
}
