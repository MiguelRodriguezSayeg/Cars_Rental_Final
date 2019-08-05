import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { toast } from "react-toastify";


export default class Cancel extends Component {
  constructor(props) {
    super(props)
    console.log('data from component', this.props.reservation);
    console.log('data from component', this.props.date);
    this.state = {
      reservation: JSON.parse(this.props.reservation)
    }
    toast.configure();
    this.refund = this.refund.bind(this);
  }

  componentDidMount(){
    var res = this.state.reservation;
    var date1 = this.get_date_php(this.props.date);
    var date2 = new Date();
    var difhora= Math.ceil(Math.abs(date1 - date2) / 36e5);
    console.log("diferencia");
    console.log(difhora);
    if (difhora<=24){
      this.refund(95);
    }
    else{
      var date3 = this.get_date(res.reservation);
      var difres= Math.ceil(Math.abs(date3 - date2) / 36e5);
      if(difres>48){
        this.refund(50);
      }
      else if(difres>1&&difres<48){
        this.refund(25);
      }
      else{
        this.refund(0);
      }
    }

  }
  refund(percentage){
    if(percentage != 0){
      axios.put('http://localhost:8000/rental/cancel_res/'+this.state.reservation.id_res, {
        cost: this.state.reservation.cost - this.state.reservation.cost*((percentage)/100)
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(percentage);
    }
    else{
      console.log("No refund possible");
    }
  }
  get_date(str){
    var year = str.slice(0, 4);
    var month = str.slice(5, 7);
    var day = str.slice(8, 10);
    var hours = str.slice(11, 13);
    var minutes = str.slice(14, 16);
    return new Date(year, month, day, hours, minutes);
  }

  get_date_php(str){
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
        <h1>Reservation cancellation.</h1>
        <h3>We are sorry you decided to cancel your order.</h3>
        <h3>Reservation #{this.state.reservation.id_res}.</h3>
      </div>
    );
  }
}

if(document.getElementById('cancel')){
  var res = document.getElementById('cancel').getAttribute('reservation');
  var date = document.getElementById('cancel').getAttribute('date');
	ReactDOM.render(<Cancel reservation={res} date={date} />, document.getElementById('cancel'));
}
