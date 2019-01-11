import { Meteor } from 'meteor/meteor'

import '../imports/api/users/users.js'

import { Boards } from '../imports/api/boards/boards.js'
import '../imports/api/boards/publications.js'

Meteor.startup(() => {
  Boards.remove({})

  const user = Accounts.findUserByUsername('Rika')

  const boardId = Boards.insert({
    boardName: 'Test Board',
    createdAt: new Date(),
    ownerId: user._id,
  })
})
