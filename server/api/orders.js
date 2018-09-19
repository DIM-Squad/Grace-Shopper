const router = require('express').Router()
var stripe = require('stripe')('sk_test_E0MMENnIPp3UuKcEwdSvVuZ4')
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
  // Destructure req.body to cart, user, token
  res.status(201).json(req.body)
  console.info('Payment has been made =>', req.body)
})

// { cart:
//   [ { id: 45,
//       name: 'Bear Orkan Arowafpic Kal Ocudeok Jiwuz',
//       price: 158364,
//       quantity: 1,
//       imageUrl:
//        'http://www.chattanoogasciencefair.org/wp-content/uploads/food-art-prints-food-art-prints-society6.jpg' },
//     { id: 13,
//       name: 'Bicoz Kic',
//       price: 100487,
//       imageUrl:
//        'http://www.chattanoogasciencefair.org/wp-content/uploads/food-art-prints-food-art-prints-society6.jpg',
//       quantity: '4' } ],
//  token:'{"id":"tok_1DBuXBAzVnAbrAV18dfSfZOf","object":"token","card":{"id":"card_1DBuXBAzVnAbrAV1wApIy3nx","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":"60657","address_zip_check":"pass","brand":"Visa","country":"US","cvc_check":"pass","dynamic_last4":null,"exp_month":5,"exp_year":2022,"funding":"credit","last4":"4242","metadata":{},"name":"info@dimllc.com","tokenization_method":null},"client_ip":"207.181.193.26","created":1537320677,"email":"info@dimllc.com","livemode":false,"type":"card","used":false}' }
