const router = require('express').Router()
const {User} = require('../db/models')
// const isAdmin = require('../auth/isAdmin')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = (await User.findById(req.params.id, {attributes: ['cart']}))
      .cart
    if (cart) res.status(200).json(JSON.parse(cart))
    else res.status(200).send()
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const jsonCart = JSON.stringify(req.body)
    const updatedUser = await (await User.findById(req.params.id)).update({
      cart: jsonCart
    })
    res.json(updatedUser.cart)
  } catch (err) {
    next(err)
  }
})
