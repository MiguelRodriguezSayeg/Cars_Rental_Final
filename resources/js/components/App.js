import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Displayer from './Displayer'
import CarDisplayer from './CarDisplayer'
import Selector from './Selector'
import LocForm from './LocForm'
import ExtraForm from './ExtraForm'
import UserForm from './UserForm'


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Selector />
          <Displayer />
          <CarDisplayer />
          <LocForm />
          <ExtraForm />
          <UserForm />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
