import React, {Component} from 'react'
import '../App.css'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Container from 'muicss/lib/react/container'
import Card from "react-material-card";

const payments = [
  {"payment": 400, "to": 123, "lat": 47.3769, "long": 8.5417, "date": "2017-09-16T09:26:15.020Z"},
  {"payment": 300, "to": 123, "lat": 47.3769, "long": 8.5417, "date": "2017-09-16T09:26:15.020Z"},
  {"payment": 200, "to": 123, "lat": 47.3769, "long": 8.5417, "date": "2017-09-16T09:26:15.020Z"},
  {"payment": 100, "to": 123, "lat": 47.3769, "long": 8.7417, "date": "2017-09-16T09:26:15.020Z"},
]

class Payments extends Component {
  constructor(props) {
    super(props)
    const socket = global.io.connect('http://localhost:4000')

    this.state = {
      payments,
    }

    socket.on('getPayments', data => {
      console.log('server payment', data)
      this.setState({
        payments: this.state.payments.concat([data.payment])
      })
    })

  }

  showPayments = () => (
    this.state.payments.map((e, i) =>
      <Card
        key={i}
        borderRadius={5}
        style={{fontSize: 20, padding: 12, marginTop: 5}}
        className="fancyCard">
        {e.payment} to Mel
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
