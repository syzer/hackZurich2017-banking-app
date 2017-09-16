import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { render } from 'react-dom'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import RaisedButton from 'material-ui/RaisedButton'
import Container from 'muicss/lib/react/container';


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
    return this.state.users.map((e, i) =>
      <div key={i} className="App-header">
        <h3>user name: {e.name}</h3>
      </div>)
  }

  render () {
    return (
      <Container>
        {this.listUsers()}
        <RaisedButton label="Default" />

        <Form>
          <legend>Title</legend>
          <Input hint="Input 1"/>
          <Input hint="Input 2"/>
          <Textarea hint="Textarea"/>
          <RaisedButton variant="raised">Submit</RaisedButton>
        </Form>

        <Form inline={true}>
          <Input/>
          <RaisedButton>submit</RaisedButton>
        </Form>
      </Container>
    )
  }
}

export default App
