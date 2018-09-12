// Product routes tests

const {expect} = require('chai')
const supertest = require('supertest')
const sinon = require('sinon')

const app = require('../index')
const agent = supertest.agent(app)

const db = require('../db')
const Product = db.model('product')

const seed = require('../../script/test-seed')

/** Entity Count Per Model in the Test Database
// const numOfCategories = 5
// const numOfArtists = 2
// const numOfProducts = 6
// const numOfUsers = 3
// const numOfReviews = 6
// const numOfOrders = 10
*/

describe.only('Product routes', () => {
  let products
  beforeEach(async () => {
    ;[
      // categories,
      // artists,
      products
      // users,
      // reviews,
      // orders,
      // lineItems
    ] = await seed()
  })

  describe(`/products`, () => {
    describe('GET /products', () => {
      it('sends all products', () => {
        return agent
          .get(`/api/products`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.be.equal(6)
            expect(
              res.body.some(product => product.name === products[0].name)
            ).to.equal(true)
          })
      })
    })
  })
})
