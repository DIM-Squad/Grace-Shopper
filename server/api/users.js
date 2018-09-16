const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const isSelfOrAdmin = require('../auth/isSelfOrAdmin')
const Op = require('sequelize').Op
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName']
      //TODO: include summary of how many orders & reviews a customer has made
      //include: [{model: Review}, {model: Order}]
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
      }
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

router.put('/', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.update(req.body.user, {
      where: {id: Number(req.body.user.id)},
      returning: true,
      plain: true
    })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})
