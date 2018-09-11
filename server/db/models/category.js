const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Category
