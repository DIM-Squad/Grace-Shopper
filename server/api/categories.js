const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Category.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryId', isAdmin, async (req, res, next) => {
  try {
    const category = await Category.update(req.body.user, {
      where: {id: Number(req.params.userId)},
      returning: true,
      plain: true
    })
    res.status(201).json(category)
  } catch (err) {
    next(err)
  }
})
