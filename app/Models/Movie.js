'use strict'

const Model = use('Model')

class Movie extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  genres() {
    return this.belongsToMany('App/Models/Genre')
  }
}

module.exports = Movie
