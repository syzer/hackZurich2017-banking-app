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
import { List, InfiniteLoader } from 'react-virtualized'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import recognizeSpeech from './Speech'
import AlertDialog from './AlertDialog'
// import * as speech from 'microsoft-speech-browser-sdk'

injectTapEventPlugin()

class App extends Component {
  constructor (props) {
    super(props)
    const socket = global.io.connect('http://localhost:4000')

    this.state = {
      name: 'Banking-app',
      party: ['Mark', 'Lukas', 'Mel', 'Ivan'].map(e => ({name: e})),
      isDialogOpen: false,
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
      this.state.news.concat(data)
    })

    // TODO unrecognized conversation from server
    socket.on('talkback', data => {
      console.log('Talkback data received: ', data)
      this.state.message.concat(data.message)
    })

    //TODO to payment and also loan
    socket.on('payment', data => {
      //TODO show alert
      console.log(data)
      console.log(data.payment)
      this.setState({ payments: this.state.payments.concat([data.payment]) })
      //this.state.payments.concat(data.payment)
    })

    //TODO to payment and also loan
    socket.on('loan', data => {
      this.state.loans.concat(data.loan)
      /*
      socket.on('loan', newLoan => {
        this.setState({
        messages: this.messages.concat([newLoan])
      })
      */
    })

    socket.on('error', err => {
      console.error(err)
      console.warn('Backend error? , is it online?')
    })

    //console.warn(process.env.REACT_APP_SECRET)
    //this.state.socket.emit('getallpayments', {})
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
    recognizeSpeech(['lets', 'record'], (event) => {
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

  // Every row is loaded except for our loading indicator row.
  isPaymentRowLoaded = ({ index }) => /*!hasNextPage || */ index < this.state.payments.size

  paymentRowRenderer =  ({ index, key, style }) => {
    console.log('In Renderer')
    let content
    var list = this.state.payments
    if (!this.isPaymentRowLoaded({ index })) {
      content = 'Loading...'
    } else {
      content = list.getIn([index, 'name'])
      console.log(content)
    }

    return (
      <div
        key={key}
        style={style}
      >
      {content}
      </div>
    )
  }


  render () {
    return (
      <Container>
        <div>
          <br/>
          <AlertDialog
            open={this.state.isDialogOpen}
            message={this.state.dialogMessage}
            onDialogClose={this.onDialogClose}
          />
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

        <div id="sidedrawer" className="mui--no-user-select">
          <div id="sidedrawer-brand" className="mui--appbar-line-height">
            <span className="mui--text-title">Banking.io</span>
          </div>
          <div className="mui-divider"/>
          <ul>
            <li>
              <strong>Going To Bar</strong>
              <ul>
                <li><a href="#neutrino-walk-into-bar">Mark</a></li>
                <li><a href="#">Lukas</a></li>
                <li><a href="#">Mel</a></li>
                <li><a href="#">Ivan</a></li>
              </ul>
            </li>
            <li>
              <strong>Payment</strong>
              <ul>
                <li><a href="#payment-last-month">Payment Last month</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
              </ul>
            </li>
            <li>
              <strong>Lend/Loan money</strong>
              <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
              </ul>
            </li>
          </ul>

        </div>
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
        {this.state.messages}
      </ul>
    </div>
    <div className="repeater">

      <BootstrapTable data={this.state.payments} striped={true} hover={true}>
        <TableHeaderColumn dataField="date" isKey={true}>Date</TableHeaderColumn>
        <TableHeaderColumn dataField="payment" isKey={false} dataAlign="center">Payment Amount</TableHeaderColumn>
        <TableHeaderColumn dataField="to" dataSort={true}>To</TableHeaderColumn>
      </BootstrapTable>

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
              pretium. Mauris dictum gravida tortor eu lacinia. Donec purus purus,
              ornare sit amet consectetur sed, dictum sitamet ex. Vivamus sit amet
              imperdiet tellus. Quisque ultrices risus a massa laoreet, vitae tempus sem
              congue. Maecenas nec eros ut lectus vehicula rutrum. Donec consequat
              tincidunt arcu non faucibus. Duis elementum, ante venenatis lacinia
              cursus, turpis massa congue magna, sed dapibus felis nibh sed tellus. Nam
              consectetur non nibh vitae sodales. Pellentesque malesuada dolor nec mi
              volutpat, eget vehicula eros ultrices.
            </p>
            <p>
              Aenean vehicula tortor a tellus porttitor, id elementum est tincidunt.
              Etiam varius odio tortor. Praesent vel pulvinar sapien. Praesent ac
              sodales sem. Phasellus id ultrices massa. Sed id erat sit amet magna
              accumsan vulputate eu at quam. Etiam feugiat semper imperdiet. Sed a sem
              vitae massa condimentum vestibulum. In vehicula, quam vel aliquet aliquam,
              enim elit placerat libero, at pretium nisi lorem in ex. Vestibulum lorem
              augue, semper a efficitur in, dictum vitae libero. Donec velit est,
              sollicitudin a volutpat quis, iaculis sit amet metus. Nulla at ante nec
              dolor euismod mattis cursus eu nisl.
            </p>
            <p>
              Quisque interdum facilisis consectetur. Nam eu purus purus. Curabitur in
              ligula quam. Nam euismod ligula eu tellus pellentesque laoreet. Aliquam
              erat volutpat. Curabitur eu bibendum velit. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Nunc efficitur
              lorem sit amet quam porta pharetra. Cras ultricies pellentesque eros sit
              amet semper.
            </p>
          </div>
        </div>
        <footer id="footer">
          <div className="mui-container-fluid">
            <br/>
            Made with ♥ <a>@HackZurich2017</a>
          </div>
        </footer>

      </Container>

    )

  }
}

export default App
