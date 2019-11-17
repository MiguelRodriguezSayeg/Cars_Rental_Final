import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {

  render(){
    return (
      <div className="container my-3" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
        <h1 >Welcome to our Car Rental Service</h1>

        <h2 >Car Rental GDL</h2>
      </div>
    );
  }
}

if(document.getElementById('home')){
	var locs = document.getElementById('home');
	ReactDOM.render(<Home />, document.getElementById('home'));
}
