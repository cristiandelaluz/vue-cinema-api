'use strict'

const Model = use('Model')

class Customer extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  bookings() {
    return this.hasMany('App/Models/Booking')
  }
}

module.exports = Customer
