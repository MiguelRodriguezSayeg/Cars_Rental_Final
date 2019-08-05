import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Displayer extends Component {
  constructor(props){
      super(props);
      console.log('data from component', this.props.categories);
  }


  render() {
  	  let cat = JSON.parse(this.props.categories);
  	  let opt_categories = cat.map((cat)=>
  	  		<option key={cat.id} value={cat.id}>{cat.name}</option>
  	  	);
      return (
          <div className="container my-5" style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
            <h3>These are the categories available for that branch office</h3>
            <div className="form-group">
            	<select className="form-control" name="category_id">
            		{opt_categories}
            	</select>
            </div>
            <button className="btn btn-primary" onClick={()=>{this.submit()}}> Choose! </button>
          </div>
      );
  }
}

if(document.getElementById('displayer')){
	var cat = document.getElementById('displayer').getAttribute('categories');
	ReactDOM.render(<Displayer categories={cat} />, document.getElementById('displayer'));
}
