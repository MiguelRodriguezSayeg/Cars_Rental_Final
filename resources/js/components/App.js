import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Displayer from './Displayer'
import Selector from './Selector'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Selector />
          <Displayer />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))