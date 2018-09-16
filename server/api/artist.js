const router = require('express').Router()
const {Artist, Product} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Artist.findAll({include: [{model: Product}]})
    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Artist.create(req.body))
  } catch (err) {
    next(err)
  }
})
