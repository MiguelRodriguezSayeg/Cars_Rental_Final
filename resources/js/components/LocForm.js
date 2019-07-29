import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LocForm extends Component {

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
  }

  render(){
    return (
      <div className="App">
        <h1>Location administrator</h1>
        <label>Address</label>
        <input type="text" name="address" onChange={(item)=>{this.setState({address:item.target.value})}} />
        <label>City</label>
        <input type="text" name="city" onChange={(item)=>{this.setState({city:item.target.value})}} />
        <label>State</label>
        <input type="text" name="state" onChange={(item)=>{this.setState({state:item.target.value})}} />
        <label>Country</label>
        <input type="text" name="country" onChange={(item)=>{this.setState({country:item.target.value})}} />
        <label>Is Airport</label>
        <input type="text" name="is_airport" onChange={(item)=>{this.setState({is_airport:item.target.value})}} />
        <button onClick={()=>{this.submit()}}> Add Location</button>
      </div>
    );
  }
}

if(document.getElementById('locform')){
	var locs = document.getElementById('locform');
	ReactDOM.render(<LocForm />, document.getElementById('locform'));
}
