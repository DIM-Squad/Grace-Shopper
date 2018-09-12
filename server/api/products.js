// Product routes
const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const productId = Number(req.params.id)
  try {
    const product = await Product.findById(productId)
    res.status(200).join(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      include: [{all: true}]
    })
    res.status(200).json(productList)
  } catch (err) {
    next(err)
  }
})
