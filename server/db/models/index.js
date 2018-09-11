const User = require('./user')
const Category = require('./category')
const Order = require('./order')
const Artist = require('./artist')
const Review = require('./review')
const Product = require('./product')

Artist.hasMany(Product)
Product.belongsTo(Artist)

Product.hasMany(Categories)
Category.belongsToMany(Product)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

Artist.hasMany(Review)
Review.belongsTo(Artist)

module.exports = {
  User,
  Category,
  Order,
  Artist,
  Review
}
