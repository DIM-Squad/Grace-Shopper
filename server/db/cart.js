const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')

const Cart = db.define('cart', {
  cart: {
    type: Sequelize.JSON
  }
})
