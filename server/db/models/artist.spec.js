const {expect} = require('chai')
const db = require('../index')
const Artist = db.model('artist')

describe('Artist model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Validations', () => {
    it('requires name', async () => {
      const artist = Artist.build()

      try {
        await artist.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires name to not be an empty string', async () => {
      const artist = Artist.build({
        name: ''
      })

      try {
        await artist.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
})
