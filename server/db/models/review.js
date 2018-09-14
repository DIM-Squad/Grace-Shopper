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

<<<<<<< HEAD
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

||||||| merged common ancestors
=======
// // Class methods
// Review.getAverageProductReview = function(productId) {
//   return this.findAll({
//     where: {productId},
//     attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'ratingAvg']]
//   })
// }

>>>>>>> a16e922fe0e35c4e00a507c3b7d4fea17ae634aa
module.exports = Review
