// Product Model
const Sequelize = require('sequelize')

// User defined imports
const db = require('../db')

const Product = db.define(
  'product',
  {
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
      type: Sequelize.INTEGER,
      defaultValue: 99999999
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: '/favicon.ico'
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    size: {
      type: Sequelize.ENUM('large', 'medium', 'small'),
      allowNull: false
    },
    featured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    avgRating: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    }
  },
  {
    //products can't truly be deleted as their order history etc. must be saved!
    paranoid: true
  }
)

module.exports = Product
