'use strict'

const Cinema = use('App/Models/Cinema')
const Genre = use ('App/Models/Genre')
const moment = require('moment')

class CinemaController {
  async all({ response }) {
    const cinemas = await Cinema.query().withCount('rooms as number_of_rooms').fetch()

    return response.json(cinemas)
  }

  async find({ response, params }) {
    const cinema = await Cinema.find(params.id)
    await cinema.loadMany({
      movie_showings: movie_showings => {
        movie_showings
          .select('id', 'movie_id', 'room_id')
          .where('show_date', moment(new Date()).format("YYYY-MM-DD"))
          .with('movie_showing_times', movie_showing_times => {
            movie_showing_times.where('hour_to_show', '>=', new Date().getHours())
              .with('bookings', bookings => {
                bookings.with('seats')
              })
          })
          .with('movie', movie => {
            movie.with('genres', genres => {
              genres.select('name')
            })
          })
          .with('room')
      }
    })

    return response.json({ data: cinema })
  }

  async allGenres({ response }) {
    const genres = await Genre.all()
    return response.json(genres)
  }
}

module.exports = CinemaController
