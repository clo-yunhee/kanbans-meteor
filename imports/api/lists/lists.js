import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Factory } from 'meteor/dburles:factory'

import { Tasks } from '../tasks/tasks.js'

class ListsCollection extends Mongo.Collection {}

export const Lists = new ListsCollection('lists')

// Deny all client-side updates since we will be using methods
Lists.deny({
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

Lists.schema = new SimpleSchema({
  boardId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  listName: {
    type: String,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  index: {
    type: SimpleSchema.Integer,
  },
})

Lists.attachSchema(Lists.schema)

Lists.publicFields = {
  boardId: 1,
  listName: 1,
  createdAt: 1,
  index: 1,
}

/*
Factory.define('list', Lists, {
  listName: '',
  createdAt: () => new Date(),
  ownerId: () => Factory.get('user'),
})
*/

Lists.helpers({
  tasks() {
    return Tasks.find({ boardId: this.boardId, listId: this._id })
  },
})
