const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineItem')
const Order = db.model('order')
const Product = db.model('product')

describe('Line item', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Set Default Value for quantity', () => {
    let newLineItem
    let newOrder
    let newProduct
    beforeEach(async () => {
      newOrder = await Order.create({
        email: 'thing@bla.com',
        shippingAddress: '3 Oz',
        shippingState: 'AZ',
        shippingCost: 34.11,
        shippingZip: '07344'
      })
      newProduct = await Product.create({
        name: 'Hello World Art',
        description: "Who says it isn't art?",
        size: 'medium',
        quantity: 0
      })
      newLineItem = await LineItem.create({
        itemPrice: 9.0,
        itemSKU: '9',
        productId: newProduct.id,
        orderId: newOrder.id
      })
    })

    it('Sets a default value for quantity', () => {
      expect(newLineItem.quantity).to.be.equal(0)
    })
  })
})
