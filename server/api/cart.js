const router = require('express').Router()
const {Cart} = require('../db/models')
// const isAdmin = require('../auth/isAdmin')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('SESSION', req.sessionID)
  try {
    const jsonCart = JSON.stringify(req.body)
    //console.log('JSON CART', jsonCart)
    const cart = await Cart.create(jsonCart)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
