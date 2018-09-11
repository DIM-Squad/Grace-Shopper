/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe.only('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Pug',
          address: 'codys address',
          isAdmin: false,
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('fullName', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        lastName: 'Pug',
        address: 'codys address',
        isAdmin: false,
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    it('returns fullName', () => {
      expect(cody.fullName).to.be.equal('Cody Pug')
    })
  })
}) // end describe('User model')
