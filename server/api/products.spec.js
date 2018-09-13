const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Artist = db.model('artist')
const Review = db.model('review')
const User = db.model('user')

describe('Product routes', () => {
  let milica,
    cantona,
    eminem,
    monalisa,
    jane,
    jon,
    ned,
    excitedjane,
    excitedjon,
    excitedned

  beforeEach(async () => {
    await db.sync({force: true})
    // Users
    jane = await User.create({
      firstName: 'jane',
      lastName: 'Awesome',
      address: 'xyz, chicago, il 60689',
      email: 'jane@pretty.com'
    })
    jon = await User.create({
      firstName: 'jon',
      lastName: 'Awesome',
      address: 'xyz, chicago, il 60689',
      email: 'jon@chill.com'
    })
    ned = await User.create({
      firstName: 'ned',
      lastName: 'Awesome',
      address: 'xyz, chicago, il 60689',
      email: 'ned@cool.com'
    })
    // Artist
    milica = await Artist.create({
      name: 'Milica Rodic',
      slug: 'milica_rodic'
    })
    // Products
    cantona = await Product.create({
      name: 'The King',
      description: "Who rules at 'Old Trafford', the theater of dreams?",
      size: 'medium',
      quantity: 5,
      artistId: milica.id
    })

    eminem = await Product.create({
      name: 'Loose Yourself',
      description:
        '... to the music the moment you want it, you gotta never let it go ...',
      size: 'large',
      quantity: 10,
      artistId: milica.id
    })

    monalisa = await Product.create({
      name: "Monalisa's Strangeness",
      description: 'Monalisa, monalisa men have name you ...',
      size: 'small',
      quantity: 22,
      artistId: milica.id
    })

    // Reviews
    excitedjane = await Review.create({
      rating: 5,
      title: 'Nostalgia',
      description: 'This painting transports me to the summer of 69.',
      productId: monalisa.id,
      userId: jane.id
    })
    excitedjon = await Review.create({
      rating: 5,
      title: 'Nostalgia',
      description:
        'If you grew up listening to Nat King Cole or Frank Sinatra, you would love it.',
      productId: monalisa.id,
      userId: jon.id
    })
    excitedned = await Review.create({
      rating: 5,
      title: 'Nostalgia',
      description:
        'This painting is reflection of everything that makes life interesting.',
      productId: monalisa.id,
      userId: ned.id
    })
  })

  describe(`/api/products`, () => {
    it('gets all products', async () => {
      const res = await request(app)
        .get(`/api/products`)
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[1].name).to.be.equal('The King')
      expect(res.body.length).to.be.equal(3)
    })
  })

  describe(`/api/products/:productId`, () => {
    it('gets product with specified id', async () => {
      const resEm = await request(app)
        .get(`/api/products/${eminem.id}`)
        .expect(200)

      expect(resEm.body).to.be.an('object')
      expect(resEm.body.name).to.equal('Loose Yourself')

      const resMon = await request(app)
        .get(`/api/products/${monalisa.id}`)
        .expect(200)

      expect(resMon.body).to.be.an('object')
      expect(resMon.body.name).to.equal("Monalisa's Strangeness")
      expect(resMon.body.reviews).to.be.an('array')
      expect(resMon.body.reviews.length).to.be.equal(3)
    })

    it('sends a 404 if not found', async () => {
      await request(app)
        .get(`/api/products/${20}`)
        .expect(404)
    })
  })
})
