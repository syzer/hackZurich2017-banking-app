import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'Banking-app',
      users: ['Mark', 'Lukas', 'Mel'].map(e => ({name: e}))
    }
  }

  listUsers () {
    return (
      this.state.users.map((e, i) =>
        <div key={i} className="App-header">
          <h3>user name: {e.name}</h3>
        </div>)
    )
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>{this.state.name}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {this.listUsers()}
      </div>
    )
  }
}

export default App
