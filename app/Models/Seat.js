'use strict'

const Model = use('Model')

class Seat extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = Seat
