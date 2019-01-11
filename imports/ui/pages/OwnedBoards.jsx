import { Meteor } from 'meteor/meteor'
import React, { PureComponent } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import '../../api/users/users.js'
import { Boards } from '../../api/boards/boards.js'

import BoardCardList from '../components/BoardCardList.jsx'

import './OwnedBoards.less'

class OwnedBoards extends PureComponent {
  render() {
    return (
      <section>
        <header>
          <h1>Owned boards</h1>
        </header>
        <BoardCardList boards={this.props.boards} />
      </section>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('boards.owned')

  return {
    boards: Boards.find({}).fetch(),
  }
})(OwnedBoards)
