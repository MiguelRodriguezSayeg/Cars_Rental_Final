import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CarDisplayer extends Component {
  constructor(props){
      super(props);
      console.log('data from component', this.props.cars);
  }


  render() {
  	  let car = JSON.parse(this.props.cars);
  	  let opt_cars = car.map((car)=>
  	  		<option key={car.id} value={car.id}>{car.brand} {car.name} {car.year}</option>
  	  	);
      return (
          <div className="container my-5" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
            <h3>These are the available cars for that category.</h3>
            <div className="form-group">
            	<select className="form-control" name="model_id">
            		{opt_cars}
            	</select>
            </div>
            <button className="btn btn-primary" onClick={()=>{this.submit()}}> Choose! </button>
          </div>
      );
  }
}

if(document.getElementById('cardisplayer')){
	var cars = document.getElementById('cardisplayer').getAttribute('cars');
	ReactDOM.render(<CarDisplayer cars={cars} />, document.getElementById('cardisplayer'));
}
