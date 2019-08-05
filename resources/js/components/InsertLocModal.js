import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class InsertLocModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      address:"",
      city:"",
      country: "",
      state: "",
      is_airport:"",
    }
  }
  submit(){

    console.log(this.state);
    fetch('http://localhost:8000/rental/store_loc',{
      method:'post',
      body:JSON.stringify(
        this.state
      ),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      }
    }).then(res => res.json())
    .then(res => {
      if (res.success) {
        alert('Data successfully inserted.');
      }else{
        alert('There are issues with your data.');
      }
    })
    .catch(function() {
    });
    this.setState({
      address:"",
      city:"",
      country: "",
      state: "",
      is_airport:"",
    });
  }

  render(){
    return (
      <div className="container my-3" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none',
                    backgroundColor: 'rgb(175, 196, 157, .6)'
                }}>
        <h1>Location administrator</h1>
        <div className="form-group">
          <label>Address</label>
          <input className="form-control" value={this.state.address} type="text" name="address" onChange={(item)=>{this.setState({address:item.target.value})}} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input className="form-control" value={this.state.city} type="text" name="city" onChange={(item)=>{this.setState({city:item.target.value})}} />
        </div>
        <div className="form-group">
          <label>State</label>
          <input className="form-control" value={this.state.state} type="text" name="state" onChange={(item)=>{this.setState({state:item.target.value})}} />
        </div>
        <div className="form-group">
        <label>Country</label>
        <input className="form-control" value={this.state.country} type="text" name="country" onChange={(item)=>{this.setState({country:item.target.value})}} />
        </div>
        <div className="form-group">
        <label>Is Airport</label>
        <input className="form-control" value={this.state.is_airport} type="text" name="is_airport" onChange={(item)=>{this.setState({is_airport:item.target.value})}} />
        </div>
        <button class="btn btn-primary" onClick={()=>{this.submit()}}> Add Location</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
