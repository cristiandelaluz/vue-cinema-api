'use strict'

const Schema = use('Schema')

class SeatSchema extends Schema {
  up () {
    this.create('seats', (table) => {
      table.increments()
      table.integer('row').comment('row number for room')
      table.integer('number').comment('seat number for room and row')
      table.enum('state', ['AVAILABLE', 'BOOKED']).defaultTo('AVAILABLE')
      table.integer('booking_id').nullable().unsigned()
      table.foreign('booking_id').references('bookings.id')
    })
  }

  down () {
    this.drop('seats')
  }
}

module.exports = SeatSchema
