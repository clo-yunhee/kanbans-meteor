import { Meteor } from 'meteor/meteor'

import { Boards } from './boards.js'

if (Meteor.isServer) {
  Meteor.publish('boards.owned', function() {
    return Boards.find({
      //ownerId: userId,
    })
  })
}
