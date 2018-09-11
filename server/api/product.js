// Product list get all route
const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      include: [{all: true}]
    })
    res.json(productList)
  } catch (err) {
    next(err)
  }
})
