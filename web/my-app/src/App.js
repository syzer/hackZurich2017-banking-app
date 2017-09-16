import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Container from 'muicss/lib/react/container'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'Banking-app',
      party: ['Mark', 'Lukas', 'Mel', 'Ivan'].map(e => ({name: e}))
    }
  }

  render () {
    return (
      <Container>
        <div id="sidedrawer" classNameName="mui--no-user-select">
          <div id="sidedrawer-brand" className="mui--appbar-line-height">
            <span className="mui--text-title">Banking.io</span>
          </div>
          <div className="mui-divider"></div>
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
          <div className="mui--appbar-height"></div>
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
