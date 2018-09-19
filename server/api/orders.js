const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
module.exports = router

router.get('/search/:key', isAdmin, async (req, res, next) => {
  try {
    res.status(200).json(
      await Order.findbyId(req.params.key, {
        include: [{model: Product}, {model: User}]
      })
    )
  } catch (err) {
    next(err)
  }
})

// Because we want non-registered user to buy stuff
router.post(`/`, async (req, res, next) => {
  // TODO
  console.info('Payment has been made =>', req.body)
})
