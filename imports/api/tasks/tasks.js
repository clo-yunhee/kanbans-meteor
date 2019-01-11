import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Factory } from 'meteor/dburles:factory'

import { Users } from '../users/users.js'

class TasksCollection extends Mongo.Collection {}

export const Tasks = new TasksCollection('tasks')

// Deny all client-side updates since we will be using methods
Tasks.deny({
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

Tasks.schema = new SimpleSchema({
  boardId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  listId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  index: {
    type: SimpleSchema.Integer,
  },
  assignedTo: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
})

Tasks.attachSchema(Tasks.schema)

Tasks.publicFields = {
  boardId: 1,
  listId: 1,
  description: 1,
  createdAt: 1,
  index: 1,
  assignedTo: 1,
}

/*
Factory.define('list', Lists, {
  listName: '',
  createdAt: () => new Date(),
  ownerId: () => Factory.get('user'),
})
*/

Tasks.helpers({
  assigned() {
    return this.assignedTo ? Users.findOne(this.assignedTo) : null
  },
})
