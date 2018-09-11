const chai = require('chai')
const db = require('../index')
const Review = db.model('review')

const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('SetDefaultRating', () => {
    let newReview
    beforeEach(async () => {
      newReview = await Review.create({
        title: 'DIM-Squad is the best',
        description: 'We have got this figured out!'
      })
    })

    it('Sets a default value for stars', () => {
      expect(newReview.rating).to.be.equal(1)
    })
  })
})
