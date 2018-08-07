'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ request, response, auth }) {
    const { user } = request.all()
    const logged = await auth.attempt(user.email, user.password, true)

    return response.json(logged)
  }

  async register({ request, response }) {
    const userInstance = new User()
    const { user } = request.all()

    userInstance.username = user.email
    userInstance.email = user.email
    userInstance.password = user.password

    await userInstance.save()

    return response.json(userInstance)
  }

  async profile({ request, response, auth }) {
    let user = await auth.getUser()
    const userInput = request.input('user')
    user.email = userInput['email']
    user.username = userInput['username']
    await user.save()

    const logged = await auth.generate(user, true)
    
    return response.json(logged)
  }
}

module.exports = AuthController
