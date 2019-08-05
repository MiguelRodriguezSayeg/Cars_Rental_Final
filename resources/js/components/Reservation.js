import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Reservation extends Component {
  constructor(props) {
    super(props)
    console.log('data from component', this.props.reservation_id);
    console.log('data from component', this.props.client);
  }
  render(){
    let person = JSON.parse(this.props.client);
    return (
      <div className="container my-5" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
        <div className="form-group">
            <h1>Thank you for your reservation, Mr./Mrs. {person.lastname}</h1>
            <h4>A confirmation has already been sent to the email: {person.email}</h4>
            <h4>Your reservation number is: {this.props.reservation_id}</h4>
            <h5>Remember that you can save up to 10% by paying your reservation within an hour. </h5>
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight">
                <form method="POST" action="http://localhost:8000/rental/payment/">
                  <input type="hidden" name="reservation_id" id="reservation_id" value={this.props.reservation_id} />
                  <input  className="btn btn-primary" type="submit" value="Pay now!" />
                </form>
              </div>
              <div class="p-2 bd-highlight">
              <form method="POST" action="http://localhost:8000/rental/cancel/">
                <input type="hidden" name="reservation_id" id="reservation_id" value={this.props.reservation_id} />
                <input  className="btn btn-primary" type="submit" value="Cancel" />
              </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

if(document.getElementById('reservation')){
  var res_id = document.getElementById('reservation').getAttribute('reservation_id');
  var cli = document.getElementById('reservation').getAttribute('client');
	ReactDOM.render(<Reservation reservation_id={res_id} client={cli} />, document.getElementById('reservation'));
}
