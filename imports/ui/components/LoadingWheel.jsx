import React from 'react'

import './LoadingWheel.less'

class LoadingWheel extends React.PureComponent {
  render() {
    return (
      <div className={this.props.className}>
        <div className={this.props.show ? 'lds-ring' : ''}>
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }
}

LoadingWheel.propTypes = {
  className: React.PropTypes.string,
  show: React.PropTypes.bool,
}

export default LoadingWheel
