import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ReservationForm extends Component {
  render(){
    return (
      <div className="container my-5" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
          <div className="form-group">
            <label htmlFor="lastname">Last name:</label>
            <input type="text" name="lastname" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="res_id">Reservation id:</label>
            <input type="number" name="res_id" className="form-control" />
          </div>
          <input  className="btn btn-primary" type="submit" value="Submit" />
      </div>
    );
  }
}

if(document.getElementById('reservationform')){
	ReactDOM.render(<ReservationForm />, document.getElementById('reservationform'));
}
