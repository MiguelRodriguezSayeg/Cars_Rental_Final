import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class EditLocModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations:[],
      current:{id:"",address:"",state:"",city:"",country:"",is_airport:0}
    }
  }

  update(that){
      var current = that.state.current;
      return function(){
        axios.put('http://localhost:8000/rental/update_locations/'+current.id, current).then(
          window.location.reload())
      }
    }

  componentDidMount() {
    fetch('http://localhost:8000/rental/locationslist/').then( r => r.json() ).then(
      r => {
        this.setState({
          locations: r.data.locations,
          current: JSON.parse(JSON.stringify(r.data.locations))[0]
        });
      }
    );
  }

  render(){
    var loc = {}
    let opt_locations = null;
    if(typeof this.state.locations !== 'undefined' && this.state.locations.length > 0){
      loc = JSON.parse(JSON.stringify(this.state.locations));
      opt_locations = loc.map((loc)=>
          <option key={loc.id} value={loc.id}>{loc.city} {loc.address}</option>
      );
    }
    return (
      <div className="container my-3" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none',
                    backgroundColor: 'rgb(175, 196, 157, .6)'
                }}>
        <h1>Edit Locations</h1>
        <select className="form-control" onChange={(item)=>{this.setState({
          current: loc.filter(l => {return l.id == item.target.value})[0]
        })}}>
          {opt_locations}
        </select>
        <div className="form-group">
          <label>Address</label>
          <input className="form-control" value={this.state.current.address} type="text" name="address" onChange={(item)=>{this.setState({current:{ ...this.state.current, address: item.target.value}})}} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input className="form-control" value={this.state.current.city}
          type="text" name="city" onChange={(item)=>{this.setState({current:{ ...this.state.current, city: item.target.value}})}} />
        </div>
        <div className="form-group">
          <label>State</label>
          <input className="form-control" value={this.state.current.state}
          type="text" name="state" onChange={(item)=>{this.setState({current:{ ...this.state.current, state: item.target.value}})}} />
        </div>
        <div className="form-group">
        <label>Country</label>
        <input className="form-control" value={this.state.current.country}
        type="text" name="country" onChange={(item)=>{this.setState({current:{ ...this.state.country, city: item.target.value}})}} />
        </div>
        <div className="form-group">
        <label>Is Airport</label>
        <input className="form-control" value={this.state.current.is_airport}
        type="text" name="is_airport" onChange={(item)=>{this.setState({current:{ ...this.state.current, is_airport: item.target.value}})}} />
        </div>
        <button class="btn btn-primary" onClick={this.update(this)}> Edit Location</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
