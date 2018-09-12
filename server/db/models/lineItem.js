const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  itemPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  itemSKU: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = LineItem
