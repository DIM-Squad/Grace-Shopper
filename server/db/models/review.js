const Sequelize = require('sequelize')
const db = require('../db')

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
      notEmpty: true
    }
  }
})

// Class Method
Review.getAverageProductReview = function(productId) {
  return this.findAll({
    where: {productId},
    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'ratingAvg']]
  })
}

Review.afterCreate(async (instance, options) => {
  await Review.getAverageProductReview(instance.productId)
})

module.exports = Review
