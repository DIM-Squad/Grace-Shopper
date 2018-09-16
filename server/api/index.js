const router = require('express').Router()

// User defined imports
const {Order} = require('../db/models')
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))

// Because we want non-registered user to buy stuff
router.post(`/orders`, async (req, res, next) => {
  // TODO
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
