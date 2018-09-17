const router = require('express').Router()
const isAdmin = require('../auth/isAdmin')
const isSelfOrAdmin = require('../auth/isSelfOrAdmin')
const Op = require('sequelize').Op
const {User, Order, Product, Review} = require('../db/models')

module.exports = router

// LoggedIn User route to GET a specific Order in their collection
router.get(
  `/:userId/orders/:orderId`,
  isSelfOrAdmin,
  async (req, res, next) => {
    const userId = Number(req.params.userId)
    const orderId = Number(req.params.orderId)
    try {
      const order = await Order.findOne({
        where: {userId, id: orderId},
        include: [{model: User}, {model: Product}] // Eagerload everything since it's one single Order
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
      limit: 25,
      include: [{model: Product}],
      order: [['createdAt', 'DESC']]
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
      include: [{model: User}, {model: Product}] // Eagerload everything since it's one single Order
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
      limit: 25,
      include: [{model: Product}],
      order: [['createdAt', 'DESC']]
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
      ],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
      // attributes: {
      //   exclude: ['isAdmin', 'password', 'googleId', 'avgRating']
      // }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/search/:key', isAdmin, async (req, res, next) => {
  try {
    const terms = req.params.key.split(' ')
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName'],
      where: {
        [Op.or]: [
          {
            firstName: {[Op.iLike]: '%' + terms[0] + '%'}
          },
          {lastName: {[Op.iLike]: '%' + terms[0] + '%'}},
          {lastName: {[Op.iLike]: '%' + terms[1] + '%'}}
        ]
      },
      include: [{model: Order}],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
      include: [{model: Review}, {model: Order}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.update(req.body.user, {
      where: {id: Number(req.params.userId)},
      returning: true,
      plain: true
    })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isSelfOrAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: Number(req.params.userId)}
    })
    res.status(202).send()
  } catch (err) {
    next(err)
  }
})
