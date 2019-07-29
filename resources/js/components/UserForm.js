import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserForm extends Component {
  constructor(props) {
    super(props)
    console.log('data from component', this.props.reservation);
  }
  render(){
    let prop = JSON.parse(this.props.reservation);
    prop = prop[0];
    return (
      <div className="container my-5">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last name:</label>
            <input type="text" name="lastname" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-control" />
          </div>
          <input type="hidden" name="origin" id="origin" value={prop.origin} />
          <input type="hidden" name="destiny" id="destiny" value={prop.destiny} />
          <input type="hidden" name="reservation" id="reservation" value={prop.reservation} />
          <input type="hidden" name="return" id="return" value={prop.return} />
          <input type="hidden" name="model_id" id="model_id" value={prop.model_id} />
          <input type="hidden" name="category_id" id="category_id" value={prop.category_id} />
          <input type="hidden" name="is_airport" id="is_airport" value={prop.is_airport} />
          <input  className="btn btn-primary" type="submit" value="Submit" />
      </div>
    );
  }
}

if(document.getElementById('userform')){
  var res = document.getElementById('userform').getAttribute('reservation');
  var cost = document.getElementById('userform').getAttribute('cost');
  var extr = document.getElementById('userform').getAttribute('extras');
	ReactDOM.render(<UserForm reservation={res} cost={cost} extras={extr}/>, document.getElementById('userform'));
}
