import React, {Component} from 'react'
import '../App.css'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Container from 'muicss/lib/react/container'
import chart from './d3-for-poor.png'


var Chart = require('react-d3-core').Chart
var LineChart = require('react-d3-basic').LineChart
var chartData = [
  {"payment":320,"to":123,"lat":47.3769,"long":8.5417,"date":"2017-09-16T09:26:15.020Z"},
  {"payment":83,"to":123,"lat":47.3769,"long":8.5417,"date":"2017-09-16T09:26:15.020Z"},
  {"payment":200,"to":123,"lat":47.3769,"long":8.5417,"date":"2017-09-16T09:26:15.020Z"},
  {"payment":120,"to":123,"lat":47.3769,"long":8.7417,"date":"2017-09-16T09:26:15.020Z"}]

var width = 700,
  height = 300,
  margins = {left: 100, right: 100, top: 50, bottom: 50},
  title = "User sample",
  // chart series,
  // field: is what field your data want to be selected
  // name: the name of the field that display in legend
  // color: what color is the line
  chartSeries = [
    {
      field: 'payment',
      name: 'Payments',
      color: '#ff7f0e'
    }
  ],

  // your x accessor
  x = function(d) {
    return d.index;
  }

class Summary extends Component {
  constructor(props) {
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

  render() {
    return (
      <BrowserRouter>
        <Container>
          <div>
            <h1>Dashboard</h1>
              <img src={chart} className="App-logo" alt="chart" />

            <Chart
              title={title}
              width={width}
              height={height}
              margins={margins}
            >
              <LineChart
                showXGrid={false}
                showYGrid={false}
                margins={margins}
                title={title}
                data={chartData}
                width={width}
                height={height}
                chartSeries={chartSeries}
                x={x}
              />
            </Chart>
            {this.props.summary}
          </div>
        </Container>
      </BrowserRouter>
    )
  }
}

export default Summary
