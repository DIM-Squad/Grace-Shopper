const router = require('express').Router()

// User defined imports
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/cart', require('./cart'))

router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
