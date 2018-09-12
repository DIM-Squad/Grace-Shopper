/* global describe beforeEach it */

const chai = require('chai')
const db = require('../index')
const Product = db.model('product')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('SetDefaultPrice', () => {
    let newProduct
    beforeEach(async () => {
      newProduct = await Product.create({
        name: 'Hello World Art',
        description: "Who says it isn't art?",
        size: 'medium',
        quantity: 0
      })
    })
    it('appropriately creates a price attribute', () => {
      expect(newProduct.dataValues).to.have.ownProperty('price')
    })
    it('sets a default value for price', () => {
      expect(parseFloat(newProduct.price)).to.equal(999999.99)
    })
  })
})
