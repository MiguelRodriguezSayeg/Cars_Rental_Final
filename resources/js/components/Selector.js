import React, { Component } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';

export default class Selector extends Component {
  constructor(props){
      super(props);
      this.state = {
        origin:JSON.parse(this.props.locations)[0].id.toString(),
        destiny:JSON.parse(this.props.locations)[0].id.toString(),
        return:this.get_Max_Time(),
        reservation:this.get_Time(),
      }
      console.log('data from component', this.props.locations);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.get_Time = this.get_Time.bind(this);
      this.get_Max_Time = this.get_Max_Time.bind(this);
  }

  handleSubmit(){
      console.log(this.state);
      var origin_is_null = this.state.origin != "";
      var destiny_is_null = this.state.destiny != "";
      var return_is_null = this.state.return != "";
      var reservation_is_null = this.state.reservation != "";
      if (origin_is_null && destiny_is_null && return_is_null && reservation_is_null){
        fetch('http://localhost:8000/rental/categories/',{
          method:'post',
          body:JSON.stringify(this.state),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(function(response){
          console.log(response)
        })
      }
      else{
        alert("Null elements in submit.")
      }

  }

  get_Time(){
      var today = new Date();
      today.setDate(today.getDate() + 1);
      today.setHours(today.getHours()+1);
      var day = today.getDate();
      day = (day>9 ? '' : '0') + day;
      var month = today.getMonth()+1;
      month = (month>9 ? '' : '0') + month;
      var year = today.getFullYear();
      var date = year+'-'+month+'-'+day;
      var hour = today.getHours();
      var minutes = today.getMinutes();
      var time = hour + ":" + minutes;
      var dateTime = date+'T'+time;
      return dateTime;
  }
  get_Max_Time(){
      var today = new Date();
      today.setDate(today.getDate() + 1);
      today.setHours(today.getHours()+2);
      var day = today.getDate();
      day = (day>9 ? '' : '0') + day;
      var month = today.getMonth()+1;
      month = (month>9 ? '' : '0') + month;
      var year = today.getFullYear();
      var date = year+'-'+month+'-'+day;
      var hour = today.getHours();
      var minutes = today.getMinutes();
      var time = hour + ":" + minutes;
      var dateTime = date+'T'+time;
      return dateTime;
  }
  render() {
      let loc = JSON.parse(this.props.locations);
      let opt_locations = loc.map((loc)=>
          <option key={loc.id} value={loc.id}>{loc.city} {loc.address}</option>
      );
      return (
          <div className="container my-3" style={{backgroundColor: 'rgb(20, 28, 167, .7)'}}>
            <h1 style={{color: 'white'}}>Reservation details</h1>
            <form method="POST" action="http://localhost:8000/rental/categories/">
              <div className="form-group">
                <label htmlFor="origin" style={{color: 'white'}}>From:</label>
              	<select className="form-control" name="origin" onChange={(item)=>{this.setState({origin:item.target.value})}} required >
                  {opt_locations}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="reservation" style={{color: 'white'}}>Reservation date:</label>
                <input type="datetime-local" name="reservation" defaultValue={this.state.reservation} min={this.state.reservation} onChange={(item)=>{this.setState({reservation:item.target.value})}}
                className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="destiny" style={{color: 'white'}}>To:</label>
                <select className="form-control" name="destiny" onChange={(item)=>{this.setState({destiny:item.target.value})}} required >
                  {opt_locations}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="return" style={{color: 'white'}}>Return date:</label>
                <input type="datetime-local" defaultValue={this.state.return} min={this.state.return}
                className="form-control" name="return" onChange={(item)=>{this.setState({return:item.target.value})}} required />
              </div>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
      );
  }
}

if(document.getElementById('selector')){
  var loc = document.getElementById('selector').getAttribute('locations');
	ReactDOM.render(<Selector locations={loc}/>, document.getElementById('selector'));
}
