'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.put('profile', 'AuthController.profile').middleware(['auth:jwt'])

  Route.get('cinema/:id', 'CinemaController.find')
  Route.get('cinemas', 'CinemaController.all')
  Route.get('genres', 'CinemaController.allGenres')

  Route.get('movies/:cinemaId/byCinema', 'MovieController.byCinema')
  Route.get('movies/:movieId/byMovie', 'MovieController.byMovie')

  Route.post('booking', 'BookingController.save').middleware(['auth:jwt'])
  Route.get('bookings/last', 'BookingController.last').middleware(['auth:jwt'])
  Route.get('bookings/all', 'BookingController.all').middleware(['auth:jwt'])
}).prefix('api/v1')

Route.on('/').render('welcome')
