import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  render () {
    return (
      <div id="sidedrawer" className="mui--no-user-select">
        <div id="sidedrawer-brand" className="mui--appbar-line-height">
          <span className="mui--text-title">Banking.io</span>
        </div>
        <div className="mui-divider"/>
        <ul>
          <li>
            <nav>
              <Link to="/payments"><strong>Going To Bar</strong></Link>
            </nav>
            <ul>
              <li><a href="#">Daniel</a></li>
              <li><a href="#">Lukas</a></li>
              <li><a href="#">Mel</a></li>
              <li><a href="#">Ivan</a></li>
            </ul>
          </li>
          <li>
            <nav>
              <Link to="/summary"><strong>Payment Summary</strong></Link>
            </nav>
            <ul>
              <li><a href="#">Payment Last month</a></li>
              <li><a href="#">Invest in Doge coins</a></li>
              <li><a href="#">Such mobile</a></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideBar
