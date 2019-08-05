import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class DelLocModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations:[],
      current_ind:0
    }
  }

  delete(that){
      var current = that.state.current_ind;
      return function(){
        axios.delete('http://localhost:8000/rental/delete_locations/'+current).then(
          window.location.reload())
      }
    }

  componentDidMount() {
    fetch('http://localhost:8000/rental/locationslist/').then( r => r.json() ).then(
      r => {
        this.setState({
          locations: r.data.locations
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
        <h1>Delete Locations</h1>
        <select className="form-control" onChange={(item)=>{this.setState({current_ind:item.target.value})}}>
          {opt_locations}
        </select>
        <button class="btn btn-primary" onClick={this.delete(this)}>Delete Location</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
