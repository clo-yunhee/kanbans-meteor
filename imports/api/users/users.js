import { Meteor } from 'meteor/meteor'

import { Boards } from '../boards/boards.js'

Meteor.users.helpers({
  ownedBoards() {
    return this._id
      ? Boards.find({
          ownerId: this._id,
        })
      : []
  },
})

// publications
if (Meteor.isServer) {
  Meteor.publish('users.publicInfo', function(userId) {
    return Meteor.users.find({
      _id: Array.isArray(userId) ? { $in: userId } : userId,
    })
  })
}
