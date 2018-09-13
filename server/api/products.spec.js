const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Artist = db.model('artist')

describe('Product routes', () => {
  let milica, cantona, eminem, monalisa
  beforeEach(async () => {
    await db.sync({force: true})

    milica = await Artist.create({
      name: 'Milica Rodic',
      slug: 'milica_rodic'
    })

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
    })

    it('sends a 404 if not found', async () => {
      await request(app)
        .get(`/api/products/${20}`)
        .expect(404)
    })
  })
})
