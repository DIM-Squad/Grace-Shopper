const router = require('express').Router()
const {Cart} = require('../db/models')
// const isAdmin = require('../auth/isAdmin')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    console.log('Fetching cart on log in =>', cart.dataValues)
    res.status(200).json(JSON.parse(cart))
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  // console.log('SESSION', req.params.id)
  try {
    const jsonCart = JSON.stringify(req.body)
    console.log('JSON CART', jsonCart)
    // const [cart] = await Cart.findOrCreate({where: {userId: req.params.id}
    // })
    // await cart.update({ cart: jsonCart })
    const cart = await Cart.upsert(jsonCart, {where: {userId: req.params.id}})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
