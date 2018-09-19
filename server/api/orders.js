const router = require('express').Router()
// var stripe = require('stripe')('sk_test_E0MMENnIPp3UuKcEwdSvVuZ4')
const {Order, Product, User, LineItem} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const nodemailer = require('nodemailer')
const formatPrice = require('../utils/formatPrice')
const getSha1 = require('../utils/getSha1')

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
  let {user, cart, address, shippingCost, totalCost, token} = req.body
  const email = user.email || 'dimsquad@dimsquadll.com'
  const userId = user.id || getSha1(req.sessionID)

  try {
    // Create Order
    const newOrder = await Order.create(
      {
        email,
        status: 'complete',
        shippingAddress: address.shipping_address_line1,
        shippingCity: address.shipping_address_city,
        shippingState: address.shipping_address_state,
        shippingZip: address.shipping_address_zip,
        shippingCountry: address.shipping_address_country,
        shippingCost,
        totalCost,
        userId
      },
      {
        include: [{model: Product}, {model: User}]
      }
    )

    // console.log('Cart in the post request =>', cart)

    const lineItems = await Promise.all(
      cart.map(cartItem =>
        LineItem.create({
          ...cartItem,
          orderId: newOrder.dataValues.id
        })
      )
    )
    // Decrementing Product Quantity works!!!!

    // Send Email to dummy address ...

    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message)
        return process.exit(1)
      }

      console.log('Credentials obtained, sending message...')

      // Create a SMTP transporter object
      // let transporter = nodemailer.createTransport({
      //   host: account.smtp.host,
      //   port: account.smtp.port,
      //   secure: account.smtp.secure,
      //   auth: {
      //     user: account.user,
      //     pass: account.pass
      //   }
      // })

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'dedkmcuyhxbpplax@ethereal.email',
          pass: 'WHpBvYqrJ6WvtdRDzu'
        }
      })

      // Message object
      let message = {
        from: 'Dim Squad LLC <dimsquad@dimsquadll.com>',
        to: `${user.fullName || 'Guest'} <${email}>`,
        subject: `Confirmation of your Order -#${newOrder.shippingZip}${
          newOrder.shippingState
        }${newOrder.id}}`,
        // text: `Hello to ${user.firstName}!`,
        html: `<div>
          <p><b>Hello</b> to ${user.firstName || 'Guest'}!</p>
          <p> We at Dim Squad appreciate your business
          and would like to thank you for doing business worth
          ${formatPrice(totalCost)} &nbsp; today.</p>
          <p>Your Sincerely, @DimSquad</p>
        <div>`
      }

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message)
          return process.exit(1)
        }

        console.log('Message sent: %s', info.messageId)
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      })
    })

    // Empty User Cart
    if (user.firstName) {
      const [rowCount, rows] = await User.update(
        {
          cart: ''
        },
        {where: {id: userId}, returning: true, plain: true}
      )
    }
    // console.log('Magic Methods =>', Object.keys(lineItems.__proto__))
    // console.log('The NEW LineItems =>', lineItems)
    res.status(201).json(newOrder.dataValues)
  } catch (err) {
    next(err)
  }
})
