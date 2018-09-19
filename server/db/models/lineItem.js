const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const Op = Sequelize.Op

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
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/favicon.ico'
  }
})

LineItem.afterCreate((instance, options) => {
  return Product.update(
    {
      quantity: Sequelize.literal(`quantity - ${instance.quantity}`)
    },
    {
      where: {
        id: instance.productId
      }
    }
  )
})

module.exports = LineItem
