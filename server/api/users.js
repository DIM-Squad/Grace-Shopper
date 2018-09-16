const router = require('express').Router()
const {User, Order, Product, LineItem} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const isSelfOrAdmin = require('../auth/isSelfOrAdmin')
module.exports = router

// LoggedIn User route to GET a specific Order in their collection
router.get(
  `/:userId/orders/:orderId`,
  isSelfOrAdmin,
  async (req, res, next) => {
    const userId = Number(req.params.userId)
    const orderId = Number(req.params.orderId)
    try {
      const order = await Order.findById(orderId, {
        where: {userId},
        include: [{model: User}, {model: LineItem, include: [{model: Product}]}] // Eagerload everything since it's one single Order
      })
      if (!order || order === {}) {
        res.status(404).end()
      } else {
        res.status(200).json(order)
      }
    } catch (err) {
      next(err)
    }
  }
)

// LoggedIn User route to GET all his Orders in the system
router.get(`/:userId/orders/`, isSelfOrAdmin, async (req, res, next) => {
  const userId = Number(req.params.userId)
  try {
    const orderList = await Order.findAll({
      where: {userId},
      include: [{model: User}, {model: LineItem, include: [{model: Product}]}]
    })
    if (!orderList.length) {
      res.status(404).end()
    } else {
      res.status(200).json(orderList)
    }
  } catch (err) {
    next(err)
  }
})

// LoggedIn User or Admin route to GET specific Order in the system
router.get(`/orders/:orderId`, isAdmin, async (req, res, next) => {
  const orderId = Number(req.params.orderId)
  try {
    const order = await Order.findById(orderId, {
      include: [{model: User}, {model: LineItem, include: [{model: Product}]}] // Eagerload everything since it's one single Order
    })
    if (!order || order === {}) {
      res.status(404).end()
    } else {
      res.status(200).json(order)
    }
  } catch (err) {
    next(err)
  }
})

// Admin route to GET all Orders in the system
router.get(`/orders`, isAdmin, async (req, res, next) => {
  try {
    const orderList = await Order.findAll({
      include: [{model: User}, {model: LineItem, include: [{model: Product}]}]
    })
    if (!orderList.length) {
      res.status(404).end()
    } else {
      res.status(200).json(orderList)
    }
  } catch (err) {
    next(err)
  }
})

// Admin route to GET all users in the system
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'fullName',
        'firstName',
        'lastName',
        'email',
        'address'
      ]
      // attributes: {
      //   exclude: ['isAdmin', 'password', 'googleId', 'avgRating']
      // }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
