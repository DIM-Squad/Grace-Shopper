// Product routes
const router = require('express').Router()
const {Product, Category, Artist} = require('../db/models')
module.exports = router

router.get(`/:productId`, async (req, res, next) => {
  const productId = Number(req.params.productId)
  try {
    const product = await Product.findById(productId)
    if (!product || product === {}) {
      res.status(404).end()
    } else {
      res.status(200).json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      include: [{model: Category}, {model: Artist}]
    })
    if (!productList.length) {
      res.status(404).end()
    } else {
      res.status(200).json(productList)
    }
  } catch (err) {
    next(err)
  }
})
