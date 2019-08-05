import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Displayer from './Displayer'
import CarDisplayer from './CarDisplayer'
import Selector from './Selector'
import LocForm from './LocForm'
import ExtraForm from './ExtraForm'
import UserForm from './UserForm'
import Reservation from './Reservation'
import ReservationForm from './ReservationForm'
import ReservationStatus from './ReservationStatus'
import NavBar from './NavBar'
import CatForm from './CatForm'
import InsertLocModal from './InsertLocModal'
import EditLocModal from './EditLocModal'
import ResAdm from './ResAdm'
import Payment from './Payment'
import Cancel from './Cancel'


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Selector />
          <Displayer />
          <CarDisplayer />
          <LocForm />
          <ExtraForm />
          <UserForm />
          <Reservation />
          <ReservationForm />
          <ReservationStatus />
          <CatForm />
          <InsertLocModal />
          <EditLocModal />
          <ResAdm />
          <Payment />
          <Cancel />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
