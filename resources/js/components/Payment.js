import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default class Payment extends Component {
  constructor(props) {
    super(props)
    console.log('data from component', this.props.reservation);
    console.log('data from component', this.props.date);
    this.state = {
      reservation: JSON.parse(this.props.reservation)
    }
    toast.configure();
    this.handleToken = this.handleToken.bind(this);
  }

  componentDidMount(){
    var res = this.state.reservation;
    var fecha = this.props.date;
    var date1 = this.get_date(fecha);
    console.log(date1);
    var date2 = new Date();
    var difhora= Math.ceil(Math.abs(date1 - date2) / 36e5);
    console.log("diferencia");
    console.log(difhora);
    if (difhora<=1){
      var costo = res.cost - res.cost * 0.10;
      console.log(costo);
      this.setState({
        reservation: { ...this.state.reservation, cost: costo}
      });
      alert('You are elegible for a 10% discount if you pay now!');
    }
  }

  insert(obj){
    console.log(obj);
    axios.post('http://localhost:8000/rental/transaction/', obj)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  async handleToken(token, addresses){
    var reservation = this.state.reservation;
    const response = await axios.post(
      "http://localhost:8080/checkout",
      { token, reservation }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
      var obj={
        id_res: reservation.id_res,
        trans_id: token.id,
        type: 'Transfer',
        amount: reservation.cost,
        method: 'Stripe'
      };
      this.insert(obj);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  get_date(str){
    var year = str.slice(1, 5);
    var month = str.slice(6, 8);
    console.log(month);
    var day = str.slice(9, 11);
    var hours = str.slice(12, 14);
    var minutes = str.slice(15, 17);
    return new Date(year, parseInt(month)-1, day, hours, minutes);
  }

  render(){
    return (
      <div className="container my-5" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
        <h1>Payment options.</h1>
        <h3>Reservation #{this.state.reservation.id_res}.</h3>
        <div>
          <h5>Stripe</h5>
          <StripeCheckout
            stripeKey="pk_test_RxPed5oQJa04VopSRwBjYluv0050Q4P3Qp"
            token={this.handleToken}
            amount={this.state.reservation.cost * 100}
          />
        </div>
      </div>
    );
  }
}

if(document.getElementById('payment')){
  var res = document.getElementById('payment').getAttribute('reservation');
  var date = document.getElementById('payment').getAttribute('date');
	ReactDOM.render(<Payment reservation={res} date={date}/>, document.getElementById('payment'));
}
