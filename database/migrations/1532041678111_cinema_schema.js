'use strict'

const Schema = use('Schema')

class CinemaSchema extends Schema {
  up () {
    this.create('cinemas', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('screenshot', 120)
      table.string('address', 100)
      table.string('phone', 14)
      table.integer('seat_capacity')
      table.text('details')
    })
  }

  down () {
    this.drop('cinemas')
  }
}

module.exports = CinemaSchema
