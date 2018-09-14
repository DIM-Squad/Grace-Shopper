const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('line_item', {
  itemPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = LineItem
