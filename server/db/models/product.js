// Product Model
const Sequelize = require('sequelize')

// User defined imports
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 999999999.99
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/favicon.ico'
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  size: {
    type: Sequelize.ENUM('large', 'medium', 'small')
  },
  categories: {
    type: Sequelize.ARRAY,
    defaultValue: []
  }
})

module.exports = Product
