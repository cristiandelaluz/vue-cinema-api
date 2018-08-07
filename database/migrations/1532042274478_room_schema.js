'use strict'

const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.integer('rows')
      table.integer('seats')
      table.integer('number')
      table.integer('cinema_id').unsigned()
      table.foreign('cinema_id').references('cinemas.id')
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
