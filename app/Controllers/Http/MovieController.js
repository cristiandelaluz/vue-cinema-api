'use strict'

const Cinema = use('App/Models/Cinema')
const MovieShowing = use('App/Models/MovieShowing')
const moment = require('moment')

class MovieController {
  async byCinema({ response, params }) {
    const cinema = await Cinema.find(params.cinemaId)
    await cinema.loadMany({
      movie_showings: movie_showings => {
        movie_showings
          .select('id', 'movie_id', 'room_id')
          .where('show_date', moment(new Date()).format("YYYY-MM-DD"))
          .with('movie_showing_times', movie_showing_times => {
            movie_showing_times.where('hour_to_show', '>=', new Date().getHours())
          })
          .with('movie', movie => {
            movie.with('genres', genres => {
              genres.select('name')
            })
          })
          .with('room')
      }
    })

    return response.json(cinema)
  }

  async byMovie({ response, params }) {
    const movie = await MovieShowing.findBy('movie_id', params.movieId)
    await movie.loadMany({
      movie_showing_times: movie_showing_times => {
        movie_showing_times
          .where('hour_to_show', '>=', new Date().getHours())
          .with('bookings', bookings => {
            bookings.with('seats')
          })
      },
      movie: movie => {
        movie.with('genres', genres => {
          genres.select('name')
        })
      },
      room: null
    })

    return response.json(movie)
  }
}

module.exports = MovieController
