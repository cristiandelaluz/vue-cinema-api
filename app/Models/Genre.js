'use strict'

const Model = use('Model')

class Genre extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  movies() {
    return this.belongsToMany('App/Models/Movie')
  }
}

module.exports = Genre
