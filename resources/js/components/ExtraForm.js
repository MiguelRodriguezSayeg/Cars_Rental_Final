import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from 'semantic-ui-react'

export default class ExtraForm extends Component {

  constructor(props) {
    super(props)
    console.log('data from component', this.props.reservation);
    console.log('data from component', this.props.exval);
    console.log('data from component', this.props.cities);
    this.state = {
      cost: this.get_cost(),
      extras:[]
    };
    this.get_cost = this.get_cost.bind(this);
  }
  on_submit_change(ext){
    return function(){
     var elemento = document.getElementById(ext.id);
     if(elemento.checked === true){
       this.setState({cost: parseFloat(this.state.cost) + parseFloat(ext.cost)});
       this.setState({extras:
        this.state.extras.concat(ext.id)
      });
     }
     else{
       this.setState({cost: parseFloat(this.state.cost) - parseFloat(ext.cost)});
       this.setState({extras:
         this.state.extras.filter(function(item) {
           return item !== ext.id
          })
       });
     }
   }.bind(this);
  }
  get_cost(){
    var obj = JSON.parse(this.props.reservation);
    var cat = JSON.parse(this.props.category);
    var date1 = this.get_date(obj[0].return);
    var date2 = this.get_date(obj[0].reservation);
    var difhora= Math.ceil(Math.abs(date1 - date2) / 36e5);
    var precio_ciudad = Math.ceil(this.props.cities);
    if (difhora>24){
        var free_days = Math.floor(difhora/(24*6));
        var payment = difhora - free_days*24;
        var dias_completos = Math.floor(payment/24);
        var horas_netas = dias_completos*24;
        var horas_extras = payment-horas_netas;
        var precio = cat[0].cost*dias_completos + ((cat[0].cost/3)*horas_extras);
        precio = parseFloat(precio.toFixed(2));
        if(obj[0].is_airport == 1){
          return parseFloat(parseFloat(precio + precio * 0.10) + parseFloat(this.props.cities)).toFixed(2);
        }
        else{
          return parseFloat(parseFloat(precio) + parseFloat(this.props.cities)).toFixed(2);
        }

    }
    else{
        return (parseFloat(cat[0].cost) + parseFloat(this.props.cities)).toFixed(2);
    }
  }
  get_date(str){
    var year = str.slice(0, 4);
    var month = str.slice(5, 7);
    var day = str.slice(8, 10);
    var hours = str.slice(11, 13);
    var minutes = str.slice(14, 16);
    return new Date(year, month, day, hours, minutes);
  }

  render(){
    let ext = JSON.parse(this.props.exval);
    let prop = JSON.parse(this.props.reservation);
    prop = prop[0];
    let opt_cars = ext.map((ext)=>
        <div><label><input type="checkbox" id={ext.id} key={ext.id} value={ext.id} onClick={this.on_submit_change(ext)} />{ext.description}</label></div>
      );
    return (
      <div style={{backgroundColor: 'rgb(175, 196, 157, .6)'}}>
      <div className="d-flex justify-content-around">
      <span className="p-2 bd-highlight">
        <h1>Extras:</h1>
        <div>
        {opt_cars}
        </div>
      </span>
      <span className="p-2 bd-highlight">
        <div><h1>Total Cost:</h1></div>
        <div><h4 style={{display:'inline'}}>$</h4><h4 style={{display:'inline'}} name="cost">{this.state.cost}</h4></div>
        <input type="hidden" name="cost" id="cost" value={this.state.cost} />
        <input type="hidden" name="extras" id="extras" value={this.state.extras} />
        <input type="hidden" name="origin" id="origin" value={prop.origin} />
        <input type="hidden" name="destiny" id="destiny" value={prop.destiny} />
        <input type="hidden" name="reservation" id="reservation" value={prop.reservation} />
        <input type="hidden" name="return" id="return" value={prop.return} />
        <input type="hidden" name="model_id" id="model_id" value={prop.model_id} />
        <input type="hidden" name="category_id" id="category_id" value={prop.category_id} />
        <input type="hidden" name="is_airport" id="is_airport" value={prop.is_airport} />
      </span>
    </div>
    <div className="d-flex justify-content-around">
    <span className="p-2 bd-highlight">
    <input  className="btn btn-primary" type="submit" value="Submit" />
    </span>
    </div>
    </div>
    );
  }
}

if(document.getElementById('extraform')){
  var extra = document.getElementById('extraform').getAttribute('reservation');
  var exval = document.getElementById('extraform').getAttribute('exval');
  var cate = document.getElementById('extraform').getAttribute('category');
  var cit = document.getElementById('extraform').getAttribute('cities');
	ReactDOM.render(<ExtraForm reservation={extra} exval={exval} category={cate} cities={cit}/>, document.getElementById('extraform'));
}
