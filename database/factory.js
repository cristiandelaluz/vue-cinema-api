'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async(faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    created_at: faker.date()
  }
})

Factory.blueprint('App/Models/Customer', async(faker) => {
  return {
    user_id: async() => {
      return (await Factory.model('App/Models/User').create()).id
    },
    phone: faker.phone(),
    credit_card: faker.cc({ type: 'Mastercard'} )
  }
})

Factory.blueprint('App/Models/Cinema', async(faker) => {
  const name = faker.company()
  return {
    name: name,
    screenshot: `http://fakeimg.pl/600x400/?text=${name}`,
    address: faker.address(),
    phone: faker.phone(),
    seat_capacity: faker.integer({ min: 300, max: 1000 }),
    details: faker.sentence({ words: 30 })
  }
})

Factory.blueprint('App/Models/Room', async(faker, i, data) => {
  const rows = faker.integer({ min: 5, max: 20 })
  return {
    cinema_id: data.cinema_id,
    rows: rows,
    seats: rows * 10, // then seats for each row
    number: faker.integer({ min: 1, max: 20 })
  }
})

Factory.blueprint('App/Models/Movie', async(faker) => {
  const name = faker.sentence({ words: 3 })
  return {
    name: name,
    director: faker.name(),
    screenshot: `http://fakeimg.pl/600x400/?text=${name}`,
    synopsis: faker.sentence(),
    created_at: faker.date()
  }
})

Factory.blueprint('App/Models/MovieShowing', async(faker, i, data) => {
  return {
    cinema_id: data.cinema_id,
    movie_id: data.movie_id,
    room_id: data.room_id,
    show_date: new Date()
  }
})

Factory.blueprint('App/Models/MovieShowingTime', async(faker, i, data) => {
  return {
    movie_showing_id: data.movie_showing_id,
    hour_to_show: `${faker.hour()}:00`
  }
})

Factory.blueprint('App/Models/Genre', async(faker, i, data) => {
  return {
    name: data.genre_name
  }
})

Factory.blueprint('App/Models/Booking', async(faker, i, data) => {
  return {
    customer_id: data.customer_id,
    movie_showing_time_id: data.movie_showing_time_id,
    made_date: new Date(),
    seat_count: 1
  }
})

Factory.blueprint('App/Models/Seat', async(faker, i, data) => {
  return {
    booking_id: data.booking_id,
    row: faker.integer({ min: 1, max: 10 }),
    number: faker.integer({ min: 1, max: 100 }),
    state: "BOOKED"
  }
})