import React, { Component } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';

export default class ResAdm extends Component {
  constructor(props){
      super(props);
      this.state = {
        obj: JSON.parse(this.props.reservations)
      }
  }
  render() {
      console.log(this.state.obj.length);
      let table_row = this.state.obj.map((obj)=>
          <tr>
            <th scope="row">{obj.id_res}</th>
            <td>{obj.name}</td>
            <td>{obj.lastname}</td>
            <td>{obj.departure}</td>
            <td>{obj.return}</td>
            <td>{obj.model}</td>
            <td>{obj.brand}</td>
            <td>{obj.cost}</td>
            <td>{obj.status}</td>
            <td>{obj.extras}</td>
          </tr>
      );
      return (
        <div className="container my-5">
        <h1>All reservation details:</h1>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Reservation ID</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Departure Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Model</th>
              <th scope="col">Brand</th>
              <th scope="col">Cost</th>
              <th scope="col">Status</th>
              <th scope="col">Extras</th>
            </tr>
          </thead>
          <tbody>
            {table_row}
          </tbody>
        </table>
        </div>
      );
  }
}

if(document.getElementById('resadm')){
  var res = document.getElementById('resadm').getAttribute('reservations');
	ReactDOM.render(<ResAdm reservations={res}/>, document.getElementById('resadm'));
}
