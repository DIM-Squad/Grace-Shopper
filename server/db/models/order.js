const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    status: {
      type: Sequelize.ENUM('confirmed', 'complete', 'cancelled', 'pending')
    },
    shippingAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shippingCity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shippingState: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    shippingZip: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isNumeric: true
      }
    },
    shippingCountry: {
      type: Sequelize.STRING,
      defaultValue: 'USA'
    },
    shippingCost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalCost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    paranoid: true
  }
)

module.exports = Order
