'use strict'

const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.increments()
      table.dateTime('made_date').comment('Cuando se ha realizado')
      table.integer('seat_count').comment('Número de asientos reservados')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id')
      table.integer('movie_showing_time_id').unsigned()
      table.foreign('movie_showing_time_id').references('movie_showing_times.id')
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
