import React, { Component } from 'react'
import '../App.css'
import { BrowserRouter, Link, Route } from 'react-router-dom'
// import logo from './logo.svg'
// import styles from './index.css'
import Container from 'muicss/lib/react/container'
import { ReactMic } from 'react-mic'
import MicrophoneOn from 'material-ui/svg-icons/av/mic'
import MicrophoneOff from 'material-ui/svg-icons/av/stop'

import injectTapEventPlugin from 'react-tap-event-plugin'
import { FloatingActionButton } from 'material-ui'
import { List } from 'react-virtualized'
import recognizeSpeech from '../Speech'
import AlertDialog from '../AlertDialog'
import words from '../Words'
import * as ReactToastr from 'react-toastr'
// import * as speech from 'microsoft-speech-browser-sdk'


class Payments extends Component {
  constructor (props) {
    super(props)
    const socket = global.io.connect('http://localhost:4000')

    this.state = {
      name: 'Banking-app',
      party: ['Mark', 'Lukas', 'Mel', 'Ivan'].map(e => ({name: e})),
      record: false,
      blobObject: null,
      isRecording: false,
      socket,
      messages: [],
      payments: [],
      loans: [],
      news: []
    }

    socket.on('news', data => {
      console.log(data)
    })

    // TODO unrecognized conversation from server
    socket.on('talkback', data => {
      console.log('Talkback data received: ', data)
    })

    socket.on('payment', data => {
      console.log('server payment', data)
      this.setState({
        payments: this.state.payments.concat([data.payment])
      })
      // this.onDialogOpen(data.payment.amount || 500)
      this.addAlert(data.payment.amount || 500)
    })

    socket.on('loan', newLoan => {
      this.setState({
        loans: this.loans.concat([newLoan])
      })
    })

    socket.on('error', err => {
      console.error(err)
      console.warn('Backend error? , is it online?')
    })

  }

  onStart = () => {
    console.log('You can tap into the onStart callback')
  }

  onDialogOpen = (message) => {
    this.setState({
      dialogMessage: message,
      isDialogOpen: true
    })
  }

  startRecording = () => {
    recognizeSpeech(words, (event) => {
      const lastResult = event.results[0][0].transcript
      console.log('.', lastResult)
      this.state.socket.emit('postConversation', {message: lastResult})
    }, error => {
      this.onDialogOpen('Could not understand you')
    })
    this.setState({
      record: true,
      isRecording: true
    })
  }

  stopRecording = () => {
    this.setState({
      record: false,
      isRecording: false
    })
  }

  // TODO change it to WAV file
  onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob)
    this.state.socket.emit('speech', recordedBlob)
  }

  onDialogClose = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  addAlert = (amount) => {
    this.toastr.success(
      amount + ' swiss franc',
      'Payment', {
        timeOut: 5000,
        extendedTimeOut: 3000
      })
  }

  render () {
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

            <div className="repeater">
              <ul>
                <List
                  width={300}
                  height={300}
                  rowCount={this.state.payments.length}
                  rowHeight={20}
                  rowRenderer={() => null}>
                </List>
              </ul>
            </div>
            <div className="mui-container-fluid">
              <br/>
              <h1>Banking.io</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sollicitudin volutpat molestie. Nullam id tempor nulla. Aenean sit amet
                urna et elit pharetra consequat. Aliquam fringilla tortor vitae lectus
                tempor, tempor bibendum nunc elementum. Etiam ultrices tristique diam,
                vitae sodales metus bibendum id. Suspendisse blandit ligula eu fringilla
              </p>
            </div>
          </div>
        </Container>
      </BrowserRouter>
    )
  }
}

export default Payments
