const router = require('express').Router()
const {Category} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
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

router.delete('/:categoryId', isAdmin, async (req, res, next) => {
  //the way I understand it, deleting a category will also set all associations on other models to null
  try {
    await Category.destroy({
      where: {id: Number(req.params.categoryId)}
    })
    res.status(202).send()
  } catch (err) {
    next(err)
  }
})
