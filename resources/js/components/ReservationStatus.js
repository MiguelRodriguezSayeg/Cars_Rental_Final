import React, { Component } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';

export default class ReservationStatus extends Component {
  constructor(props){
      super(props);
      this.state = {
      }
      console.log('data from component', this.props.reservation);
      console.log('data from component', this.props.user);
      console.log('data from component', this.props.extras);
  }
  render() {
      let user = JSON.parse(this.props.user)[0];
      let extras = JSON.parse(this.props.extras);
      console.log(extras);
      let extra_string = extras.map((a) => a.description).join(', ');
      let reservation = JSON.parse(this.props.reservation)[0];
      let status;
      switch(parseInt(reservation.status)) {
        case 0:
          status = "Reserved";
          break;
        case 1:
          status = "Payed";
          break;
        case 2:
          status = "Cancelled";
          break;
        default:
          status = "Undefined state.";
      }
      return (
        <div className="container my-5">
        <h1>Your reservation details:</h1>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Reservation ID</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Departure Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Extras</th>
              <th scope="col">Cost</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{reservation.id_res}</th>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{reservation.reservation}</td>
              <td>{reservation.return}</td>
              <td>{extra_string}</td>
              <td>${reservation.cost}</td>
              <td>{status}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <form method="POST" action="http://localhost:8000/rental/payment/">
            <input type="hidden" name="reservation_id" id="reservation_id" value={reservation.id_res} />
              <input  className="btn btn-primary" type="submit" value="Pay now!" />
            </form>
          </div>
          <div class="p-2 bd-highlight">
          <form method="POST" action="http://localhost:8000/rental/cancel/">
            <input type="hidden" name="reservation_id" id="reservation_id" value={reservation.id_res} />
            <input  className="btn btn-primary" type="submit" value="Cancel" />
          </form>
          </div>
        </div>
        </div>
      );
  }
}

if(document.getElementById('reservationstatus')){
  var res = document.getElementById('reservationstatus').getAttribute('reservation');
  var ext = document.getElementById('reservationstatus').getAttribute('extras');
  var user = document.getElementById('reservationstatus').getAttribute('user');
	ReactDOM.render(<ReservationStatus reservation={res} extras={ext} user={user} />, document.getElementById('reservationstatus'));
}
