import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class EditCatModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories:[],
      current:{id:"",name:"",cost:0.0, capacity:0}
    }
  }

  update(that){
      var current = that.state.current;
      return function(){
        axios.put('http://localhost:8000/rental/update_categories/'+current.id, current).then(
          window.location.reload())
      }
    }

  componentDidMount() {
    fetch('http://localhost:8000/rental/categorieslist/').then( r => r.json() ).then(
      r => {
        this.setState({
          categories: r.data.categories,
          current: JSON.parse(JSON.stringify(r.data.categories))[0]
        });
      }
    );
  }

  render(){
    var cat = {}
    let opt_cat = null;
    if(typeof this.state.categories !== 'undefined' && this.state.categories.length > 0){
      cat = JSON.parse(JSON.stringify(this.state.categories));
      opt_cat = cat.map((cat)=>
          <option key={cat.id} value={cat.id}>{cat.name}</option>
      );
    }
    return (
      <div className="container my-3" style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    display: this.props.show ? 'block' : 'none',
                    backgroundColor: 'rgb(175, 196, 157, .6)'
                }}>
        <h1>Edit Categories</h1>
        <select className="form-control" onChange={(item)=>{this.setState({
          current: cat.filter(l => {return l.id == item.target.value})[0]
        })}}>
          {opt_cat}
        </select>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" value={this.state.current.name} type="text" name="name" onChange={(item)=>{this.setState({current:{ ...this.state.current, name: item.target.value}})}} />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input className="form-control" value={this.state.current.cost}
          type="number" step="any" name="cost" onChange={(item)=>{this.setState({current:{ ...this.state.current, cost: parseInt(item.target.value)}})}} />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input className="form-control" value={this.state.current.capacity}
          type="number" name="capacity" onChange={(item)=>{this.setState({current:{ ...this.state.current, capacity: parseInt(item.target.value)}})}} />
        </div>
        <button class="btn btn-primary" onClick={this.update(this)}> Edit Category</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
