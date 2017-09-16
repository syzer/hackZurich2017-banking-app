import React, {Component} from 'react'
import '../App.css'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Container from 'muicss/lib/react/container'
import Card from "react-material-card";

class Payments extends Component {
  constructor(props) {
    super(props)
    const socket = global.io.connect('http://localhost:4000')

    this.state = {
      payments: [],
    }

    socket.on('getPayments', payments => {
      console.log('server payment', payments)
      this.setState({
        payments: this.state.payments.concat(payments)
      })
    })
  }

  showPayments = () => (
    this.state.payments.map((e, i) =>
      <Card
        key={i}
        borderRadius={5}
        style={{fontSize: 20, padding: 12, margin: 5}}
        className="fancyCard">
        <span style={{color:'#DCEDC1'}}>{e.payment}</span> to Mel
      </Card>
    )
  )

  render() {
    return (
      <BrowserRouter>
        <Container>
          <header id="header">
            <div className="mui-appbar mui--appbar-line-height">
              <div className="mui-container-fluid">
                <a
                  className="sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block js-show-sidedrawer">☰</a>
                <a className="sidedrawer-toggle mui--hidden-xs mui--hidden-sm js-hide-sidedrawer">☰</a>
                <span className="mui--text-title mui--visible-xs-inline-block">Banking.io</span>
              </div>
            </div>
          </header>

          <div id="content-wrapper">
            <div className="mui--appbar-height"/>

            {this.showPayments()}

          </div>
        </Container>
      </BrowserRouter>
    )
  }
}

export default Payments
