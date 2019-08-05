import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class DelCatModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories:[],
      current_ind:0
    }
  }

  delete(that){
      var current = that.state.current_ind;
      return function(){
        axios.delete('http://localhost:8000/rental/delete_categories/'+current).then(
          window.location.reload())
      }
    }

  componentDidMount() {
    fetch('http://localhost:8000/rental/categorieslist/').then( r => r.json() ).then(
      r => {
        this.setState({
          categories: r.data.categories
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
        <h1>Delete Categories</h1>
        <select className="form-control" onChange={(item)=>{this.setState({current_ind:item.target.value})}}>
          {opt_cat}
        </select>
        <button class="btn btn-primary" onClick={this.delete(this)}>Delete Category</button>
        <button class="btn btn-danger" onClick={this.props.close}>Close</button>
      </div>
    );
  }
}
