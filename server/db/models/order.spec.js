/* global describe beforeEach it */

const chai = require('chai')
const db = require('../index')
const Order = db.model('order')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('Category model', () => {
  beforeEach(() => {
    db.sync({force: true})
  })

  it('appropriately fills in default price', async function() {
    const newOrder = (await Order.create({
      email: 'thing@bla.com',
      shippingAddress: '3 Oz',
      shippingState: 'AZ',
      shippingCost: 34.11,
      shippingZip: '07344'
    })).dataValues

    return expect(newOrder).to.have.ownProperty('shippingCountry')
  })
})
