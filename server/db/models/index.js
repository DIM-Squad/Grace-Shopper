const db = require('../db')
const User = require('./user')
const Category = require('./category')
const Order = require('./order')
const Artist = require('./artist')
const Product = require('./product')
const Review = require('./review')
const LineItem = require('./lineItem')
const Cart = require('./cart')

//join table for many-to-many associations
//http://docs.sequelizejs.com/class/lib/associations/belongs-to-many.js~BelongsToMany.html

const ProductCategory = db.define('product_category', {})

Artist.hasMany(Product)
Product.belongsTo(Artist)

Product.belongsToMany(Category, {through: ProductCategory})
Category.belongsToMany(Product, {through: ProductCategory})

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

//Not going to do this yet because it is complicated to seed.
//Artist.hasMany(Review)
//Review.belongsTo(Artist)

Product.belongsToMany(Order, {through: LineItem})
Order.belongsToMany(Product, {through: LineItem})

User.hasMany(Order)
Order.belongsTo(User)

Cart.belongsTo(User)
User.hasOne(Cart)

module.exports = {
  User,
  Category,
  Product,
  Order,
  Artist,
  Review,
  LineItem,
  ProductCategory
}
