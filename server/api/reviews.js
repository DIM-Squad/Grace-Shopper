const router = require('express').Router()
const {Review} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const isSelfOrAdmin = require('../auth/isSelfOrAdmin')
module.exports = router

router.post('/:userId', isSelfOrAdmin, async (req, res, next) => {
  try {
    console.log(req.body)
    const newReview = await Review.create(req.body)
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})

router.delete('/:reviewId', isAdmin, async (req, res, next) => {
  try {
    await Review.destroy({where: {id: req.params.reviewId}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
