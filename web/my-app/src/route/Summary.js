import React, { Component } from 'react'
import '../App.css'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Container from 'muicss/lib/react/container'
var Chart = require('react-d3-core').Chart
var LineChart = require('react-d3-basic').LineChart


class Summary extends Component {
  constructor (props) {
    super(props)
    const socket = global.io.connect('http://localhost:4000')

    this.state = {
      socket,
      summary: null,
    }

    socket.on('summary', data => {
      console.log('server payment', data)
    })

    socket.on('error', err => {
      console.error(err)
      console.warn('Backend error? , is it online?')
    })

  }

  render () {
    return (
      <BrowserRouter>
        <Container>
          <div>
            Dashboard
            {this.props.summary}
          </div>
        </Container>
      </BrowserRouter>
    )
  }
}

export default Summary
