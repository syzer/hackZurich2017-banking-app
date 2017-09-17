import React, { Component } from 'react'
import './App.css'
// import logo from './logo.svg'
// import styles from './index.css'
import Container from 'muicss/lib/react/container'
import { ReactMic } from 'react-mic'
import MicrophoneOn from 'material-ui/svg-icons/av/mic'
import MicrophoneOff from 'material-ui/svg-icons/av/stop'

import injectTapEventPlugin from 'react-tap-event-plugin'
import { FloatingActionButton } from 'material-ui'
import { List } from 'react-virtualized'
import recognizeSpeech from './Speech'
import AlertDialog from './AlertDialog'
import words from './Words'
import * as ReactToastr from 'react-toastr'
// import * as speech from 'microsoft-speech-browser-sdk'
import Summary from './route/Summary'
import Payments from './route/Payments'
import SideBar from './route/SideBar'
import {BrowserRouter, Route} from "react-router-dom";
import speech from 'speech-js'


injectTapEventPlugin()

const {ToastContainer} = ReactToastr

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class App extends Component {
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

    socket.on('news', data => console.log)

    // TODO unrecognized conversation from server
    socket.on('talkback', data => {
      console.log('Talkback data received: ', data)
      speech.synthesis(data, 'en-US')
    })

    socket.on('payment', data => {
      console.log('server payment', data)
      this.setState({
        payments: this.state.payments.concat([data.payment])
      })
      this.addAlert(data.payment.amount || 500)
    })

    // TODO
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

  // componentDidMount = () => {
  //   const recognition = speech.recognition('en-US') // speech recognition module
  //   recognition.start()
  //   recognition.onresult = e => {
  //     let result = e.results[0][0].transcript
  //     speech.synthesis(result, 'en-US')
  //     console.log(result)
  //   }
  // }

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
          <div>
            <AlertDialog
              isOpen={this.state.isDialogOpen}
              message={this.state.dialogMessage}
              onDialogClose={this.onDialogClose}
            />
            <ToastContainer
              ref={(input) => {this.toastr = input}}
              toastMessageFactory={ToastMessageFactory}
              className="toast-top-right"
              preventDuplicates="true"
            />
            <br/>
            <br/>
            <br/>
            <ReactMic
              record={this.state.isRecording}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#DCEDC1"/>
            <div>
              <audio ref="audioSource" controls="controls" src={this.state.blobURL}/>
            </div>
            <FloatingActionButton
              className="btn"
              secondary={true}
              disabled={this.state.isRecording}
              onClick={this.startRecording}>
              <MicrophoneOn/>
            </FloatingActionButton>
            <FloatingActionButton
              className="btn"
              secondary={true}
              disabled={!this.state.isRecording}
              onClick={this.stopRecording}>
              <MicrophoneOff/>
            </FloatingActionButton>
          </div>

          <SideBar/>

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

          <div>
            <Route
              path="/payments"
              component={Payments}
              payments={this.state.payments}
            />
          </div>

          <div>
            <Route path="/summary" component={Summary} />
          </div>

          <footer id="footer">
            <div className="mui-container-fluid">
              <br/>
              Made with ♥ <a>@HackZurich2017</a>
            </div>
          </footer>
        </Container>
      </BrowserRouter>
    )
  }
}

export default App
