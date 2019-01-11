import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import AccountsUI from '../components/AccountsUI.jsx'

import './NavbarContainer.less'

class NavbarContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)

    this.state = {
      showLogin: false,
    }
  }

  renderLeft() {
    return (
      <React.Fragment>
        <NavLink className="nav-item" to="/">
          Home
        </NavLink>
        <NavLink className="nav-item" to="/owned">
          Owned boards
        </NavLink>
      </React.Fragment>
    )
  }

  renderCenter() {
    return <React.Fragment />
  }

  renderRight() {
    return (
      <React.Fragment>
        <div>
          <button className="nav-item" onClick={this.handleLoginClick}>
            Sign in
          </button>
          {this.state.showLogin && <AccountsUI />}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <header className="nav-container">
        <nav className="nav-container">
          <div className="nav-side nav-left">{this.renderLeft()}</div>
          <div className="nav-side nav-center">{this.renderCenter()}</div>
          <div className="nav-side nav-right">{this.renderRight()}</div>
        </nav>
      </header>
    )
  }

  handleLoginClick() {
    this.setState({
      showLogin: !this.state.showLogin,
    })
  }
}

export default NavbarContainer
