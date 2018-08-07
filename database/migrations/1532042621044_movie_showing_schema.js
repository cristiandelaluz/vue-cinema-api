'use strict'

const Schema = use('Schema')

class MovieShowingSchema extends Schema {
  up () {
    this.create('movie_showings', (table) => {
      table.increments()
      table.integer('cinema_id').unsigned()
      table.foreign('cinema_id').references('cinemas.id')
      table.integer('movie_id').unsigned()
      table.foreign('movie_id').references('movies.id')
      table.integer('room_id').unsigned()
      table.foreign('room_id').references('rooms.id')
      table.date('show_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('movie_showings')
  }
}

module.exports = MovieShowingSchema
