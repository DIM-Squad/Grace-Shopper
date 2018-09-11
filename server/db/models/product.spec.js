/* global describe beforeEach it */

const chai = require('chai')
const db = require('../index')
const Product = db.model('product')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('Product model', () => {
  beforeEach(() => {
    db.sync({force: true})
  })

  it('appropriately fills in default price', async function() {
    const newProduct = (await Product.create({
      name: 'Hello World Art',
      description: "Who says it isn't art?",
      artistId: 1,
      size: 'medium',
      quantity: 0
    })).dataValues

    return expect(newProduct).to.have.ownProperty('price')
  })
})
