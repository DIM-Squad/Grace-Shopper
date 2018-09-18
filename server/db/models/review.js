const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Product = require('./product')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {[Op.gt]: 40}
    }
  }
})

// Class Method
Review.getAverageProductRating = async function(productId) {
  const data = await this.findAll({
    where: {productId},
    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'ratingAvg']]
  })
  return Math.floor(data[0].dataValues.ratingAvg)
}

Review.afterCreate(async (instance, options) => {
  const avgRating = await Review.getAverageProductRating(instance.productId)
  return Product.update(
    {avgRating},
    {
      where: {
        id: instance.productId
      }
    }
  )
})

module.exports = Review
