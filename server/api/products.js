// Product routes
const router = require('express').Router()
const {Product, Category, Artist, Review, User} = require('../db/models')
const Op = require('sequelize').Op

module.exports = router

router.get('/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId)
  try {
    const product = await Product.findById(productId, {
      include: [
        {
          model: Review,
          include: [{model: User}]
        }
      ]
    })
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

router.get('/search/:key', async (req, res, next) => {
  try {
    const matchingProducts = await Product.findAll({
      where: {name: {[Op.iLike]: '%' + req.params.key + '%'}},
      limit: 20,
      include: [{model: Artist}]
    })
    if (matchingProducts) {
      res.status(200).json(matchingProducts)
    } else {
      res.status(200).json([])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    res.status(200).json(
      (await Category.findById(Number(req.params.id), {
        include: [{model: Product, include: [{model: Artist}]}]
      })).products
    )
  } catch (err) {
    next(err)
  }
})

router.get('/featured/true', async (req, res, next) => {
  try {
    res.status(200).json(
      await Product.findAll({
        where: {featured: true},
        include: {model: Artist}
      })
    )
  } catch (err) {
    next(err)
  }
})
