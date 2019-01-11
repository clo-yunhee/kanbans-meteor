import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import '../../api/users/users.js'

import './BoardCardList.less'

class BoardCard extends PureComponent {
  render() {
    const { board, owner } = this.props

    return (
      <NavLink className="board-card-list-item" to={`/board/${board._id}`}>
        <article>
          <header>
            <h5>{board.boardName}</h5>
          </header>
          <p>{owner ? owner.username : 'Not owned'}</p>
        </article>
      </NavLink>
    )
  }
}

const TrackedBoardCard = withTracker(({ board }) => {
  if (!board.ownerId) {
    return { board, owner: null }
  }

  Meteor.subscribe('users.publicInfo', board.ownerId)

  return { board, owner: board.owner() }
})(BoardCard)

class BoardCardList extends PureComponent {
  render() {
    return (
      <div className="board-card-list">
        {this.props.boards.map(board => (
          <TrackedBoardCard board={board} key={board._id} />
        ))}
      </div>
    )
  }
}

export default withTracker(({ boards }) => {
  const owners = boards.filter(b => b.ownerId).map(b => b.ownerId)

  return { owners: owners }
})(BoardCardList)
