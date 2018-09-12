// Product list get all route
const router = require('express').Router()
const {Product, Category, Artist} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      include: [{model: Category}, {model: Artist}]
    })
    res.json(productList)
  } catch (err) {
    next(err)
  }
})
