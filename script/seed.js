'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Order,
  Artist,
  Review
} = require('../server/db/models')
const Chance = require('chance')
const chance = new Chance(95698435)

chance.mixin({
  user: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    address: `${chance.address()}, ${chance.city()}, ${chance.state()} ${chance.zip()}`,
    isAdmin: chance.bool({likelihood: 2})
  })
})

chance.mixin({
  words: () =>
    chance
      .sentence({words: chance.pickone([1, 2, 3, 4, 5, 6])})
      .slice(0, -1)
      .split(' ')
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(' ')
})

chance.mixin({
  product: () => ({
    name: chance.words(),
    description: chance.paragraph(),
    price: chance.natural({min: 4, max: 1688}),
    imageUrl: '/favicon.ico',
    //artistId: 1,
    size: chance.weighted(['small', 'medium', 'large'], [8, 21, 15]),
    quantity: chance.weighted([chance.natural({min: 0, max: 750}), 0], [15, 70])
  })
})

chance.mixin({
  artist: () => ({
    name: chance.name(),
    slug: 'slug'
  })
})

chance.mixin({
  category: () => ({name: chance.word()})
})

chance.mixin({
  review: () => ({
    rating: chance.natural({min: 1, max: 5}),
    description: chance.paragraph(),
    title: chance.words()
    //userId: 1,
    //artistId: 1,
    //productId: 1
  })
})

chance.mixin({
  order: () => ({
    status: chance.weighted(
      ['complete', 'cancelled', 'confirmed'],
      [4, 1, 0.5]
    ),
    shippingAddress: chance.address(),
    shippingState: chance.state({territories: true}),
    shippingCost: chance.natural({min: 100, max: 4500}) / 100,
    shippingZip: chance.zip(),
    email: chance.email()
  })
})

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.bulkCreate(chance.unique(chance.user, 400)),
    Product.bulkCreate(chance.unique(chance.product, 300)),
    Order.bulkCreate(chance.unique(chance.order, 30)),
    Category.bulkCreate(chance.unique(chance.category, 30)),
    Artist.bulkCreate(chance.unique(chance.artist, 30)),
    Review.bulkCreate(chance.unique(chance.review, 100))
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
