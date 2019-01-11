import React, { PureComponent } from 'react'

class ViewBoard extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
    }
  }

  render() {
    return (
      <section>
        <h1>Home Page</h1>
      </section>
    )
  }
}

export default ViewBoard
