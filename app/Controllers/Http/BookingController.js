'use strict'

const Booking = use('App/Models/Booking')
const Seat = use('App/Models/Seat')
const Customer = use('App/Models/Customer')
const Database = use('Database')

class BookingController {
  async save({ response, request, auth}) {
    const trx = await Database.beginTransaction()

      const user = await auth.getUser()
      const customer = await Customer.findBy('user_id', user.id)
      const booking = await Booking.create({
        customer_id: customer.id,
        movie_showing_time_id: request.input('movie_showing_time_id'),
        seat_count: request.input('seats').length,
        made_date: new Date()
      }, trx)

      let seats = []
      for(let i = 0; i < request.input('seats').length; i++) {
        const current_seat = request.input('seats')[i]
        const seat_row = current_seat.split('-')
        seats.push({
          booking_id: booking.id,
          row: seat_row[0],
          number: seat_row[1],
          state: "BOOKED"
        })
      }

      await Seat.createMany(seats, trx)

    trx.commit()

    return response.json({ res: 'ok' })
  }

  async last({ response, auth }) {
    const user = await auth.getUser()
    const customer = await Customer.findBy('user_id', user.id)
    await customer.loadMany({
      bookings: bookings => {
        bookings.where('customer_id', customer.id).limit(1).orderBy('id', 'desc')
        .with('seats')
        .with('movie_showing_time', async movie_showing_time => {
          movie_showing_time.select('id', 'movie_showing_id')
          .with('movie_showing', movie_showing => {
            movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
            .with('movie', movie => {
              movie.select('id', 'name').with('genres', genres => {
                genres.select('id', 'name')
              })
            })
            .with('cinema', cinema => {
              cinema.select('id', 'name', 'address', 'phone', 'seat_capacity')
            })
          })
        })
      }
    })

    return response.json({ data: customer })
  }

  async all({ response, auth }) {
    const user = await auth.getUser()
    const customer = await Customer.findBy('user_id', user.id)
    await customer.loadMany({
      bookings: bookings => {
        bookings.orderBy('id', 'desc')
        .withCount('seats')
        .with('movie_showing_time', async movie_showing_time => {
          movie_showing_time.select('id', 'hour_to_show', 'movie_showing_id')
          .with('movie_showing', movie_showing => {
            movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
            .with('movie', movie => {
              movie.select('id', 'name').with('genres', genres => {
                genres.select('id', 'name')
              })
            })
            .with('cinema', cinema => {
              cinema.select('id', 'name', 'address', 'phone', 'seat_capacity')
            })
          })
        })
      }
    })

    return response.json({ data: customer })
  }
}

module.exports = BookingController
