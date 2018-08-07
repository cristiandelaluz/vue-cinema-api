'use strict'

const Schema = use('Schema')

class MovieSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('name', 120)
      table.string('director', 100)
      table.string('screenshot', 100).nullable()
      table.text('synopsis')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MovieSchema
