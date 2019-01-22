import React, { Component } from 'react'

import './AccountsUI.less'

class AccountsUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      register: false,
    }
  }

  onSubmit(event) {
    event.preventDefault()
    const username = this.refs.username.value
    const password = this.refs.password.value
    const errors = {}

    if (!username) {
      errors.username = 'Username required'
    }
    if (!password) {
      errors.password = 'Password required'
    }

    this.setState({ errors })
    if (Object.keys(errors).length) {
      return
    }

    Meteor.loginWithPassword({ username: username }, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        })
      }
      console.log('login')
    })
  }

  render() {
    const { errors } = this.state

    const errorClass = key => errors[key] && 'input-error'

    return (
      <form className="wrapper-auth" onSubmit={this.onSubmit.bind(this)}>
        <header className="header-auth">
          <p className="subtitle-auth">
            Having an account lets you see and manage private boards.
          </p>
        </header>
        <div className="controls-auth">
          <input
            className={`input-symbol ${errorClass('username')}`}
            type="text"
            name="username"
            ref="username"
            placeholder="Username"
          />
          <input
            className={`input-symbol ${errorClass('password')}`}
            type="password"
            name="password"
            ref="password"
            placeholder="Password"
          />
          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </div>
        <footer className="footer-auth">
          {errors.none && <span className="text-error">{errors.none}</span>}
          <a href="#" className="link-auth-alt">
            Need an account? Join Now.
          </a>
        </footer>
      </form>
    )
  }
}

export default AccountsUI
