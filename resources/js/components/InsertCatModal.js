import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class InsertCatModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name:"",
      cost:0,
      capacity: 0
    }
  }
  submit(that){
    return function(){
      console.log("hola");
      axios.post('http://localhost:8000/rental/store_cat/', that.state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      that.setState({
        name:"",
        cost:"",
        capacity: ""
      });
    }

  }

  render(){
    return (
      <div className="container my-3" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none',
                    backgroundColor: 'rgb(175, 196, 157, .6)'
                }}>
        <h1>Categories administrator</h1>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" value={this.state.name} type="text" name="name" onChange={(item)=>{this.setState({name:item.target.value})}} />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input className="form-control" value={this.state.cost} type="number" step="any" name="cost" onChange={(item)=>{this.setState({cost:parseInt(item.target.value)})}} />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input className="form-control" value={this.state.capacity} type="number" name="capacity" onChange={(item)=>{this.setState({capacity:parseInt(item.target.value)})}} />
        </div>
        <button class="btn btn-primary" onClick={this.submit(this)}> Add Category</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
