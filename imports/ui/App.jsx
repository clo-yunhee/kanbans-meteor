import React, { PureComponent } from 'react'
import { Route, Router, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import NavbarContainer from './containers/NavbarContainer.jsx'
import Home from './pages/Home.jsx'
import ViewBoard from './pages/ViewBoard.jsx'
import OwnedBoards from './pages/OwnedBoards.jsx'
import SharedBoards from './pages/SharedBoards.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

import './App.less'

const browserHistory = createBrowserHistory()

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    // automatically relog the user in
  }

  handleLogin() {
    this.setState({
      isLoggedIn: true,
    })
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
    })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <React.Fragment>
          <NavbarContainer />
          <main className="app-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/board/:id" component={ViewBoard} />
              <Route exact path="/owned" component={OwnedBoards} />
              <Route exact path="/shared" component={SharedBoards} />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </React.Fragment>
      </Router>
    )
  }
}

export default App
