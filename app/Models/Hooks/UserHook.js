'use strict'

const Hash = use('Hash')

const UserHook = exports = module.exports = {}
const Customer = use('App/Models/Customer')

/**
 * A hook to hash the user password before saving
 * it to the database.
 */
UserHook.hashPassword = async (user) => {
  user.password = await Hash.make(user.password)
}

UserHook.setCustomer = async (user) => {
  let customer = new Customer()
  user.customer().save(customer)
}