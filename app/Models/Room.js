'use strict'

const Model = use('Model')

class Room extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  movie_showing() {
    return this.hasMany('App/Models/MovieShowing')
  }
}

module.exports = Room
