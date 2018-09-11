/* global describe beforeEach it */

const chai = require('chai')
const db = require('../index')
const Category = db.model('category')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('CannotHaveDuplicates', () => {
    let newCategory
    beforeEach(async () => {
      newCategory = await Category.create({name: 'foo'})
    })

    it("can't have duplicates", () => {
      return expect(Category.create({name: 'foo'})).to.eventually.be.rejected
    })
  })
})
