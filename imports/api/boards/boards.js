import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Factory } from 'meteor/dburles:factory'

import { Lists } from '../lists/lists.js'

class BoardsCollection extends Mongo.Collection {}

export const Boards = new BoardsCollection('boards')

// Deny all client-side updates since we will be using methods
Boards.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  },
})

Boards.schema = new SimpleSchema({
  boardName: {
    type: String,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
})

Boards.attachSchema(Boards.schema)

Boards.publicFields = {
  boardName: 1,
  createdAt: 1,
  ownerId: 1,
}

Factory.define('board', Boards, {
  boardName: '',
  createdAt: () => new Date(),
  ownerId: () => Factory.get('user'),
})

Boards.helpers({
  owner() {
    return this.ownerId ? Meteor.users.findOne(this.ownerId) : null
  },
  lists() {
    return Lists.find({ boardId: this._id })
  },
})
