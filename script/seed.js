'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Order,
  Artist,
  Review,
  ProductCategory,
  LineItem
} = require('../server/db/models')
const Chance = require('chance')
const chance = new Chance(95698435)

const numOfCategories = 13
const numOfArtists = 12
const numOfProducts = 60
const numOfUsers = 200
const numOfReviews = 230
const numOfOrders = 1000

chance.mixin({
  user: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    address: `${chance.address()}, ${chance.city()}, ${chance.state()} ${chance.zip()}`,
    isAdmin: chance.bool({likelihood: 2}),
    password: 'dimsquad'
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
    price: chance.natural({min: 400, max: 168800}),
    imageUrl: '/favicon.ico',
    artistId: chance.natural({min: 1, max: numOfArtists}),
    size: chance.weighted(['small', 'medium', 'large'], [8, 21, 15]),
    quantity: chance.weighted(
      [chance.natural({min: 0, max: 750}), 0],
      [80, 15]
    ),
    featured: chance.bool({likelihood: 15})
  })
})

chance.mixin({
  artist: () => ({
    name: chance.name(),
    slug: 'slug'
  })
})

chance.mixin({
  review: () => ({
    rating: chance.natural({min: 1, max: 5}),
    description: chance.paragraph(),
    title: chance.words(),
    userId: chance.natural({min: 1, max: numOfUsers}),
    //artistId: 1,
    productId: chance.natural({min: 1, max: numOfProducts})
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
    shippingCost: chance.natural({min: 100, max: 4500}),
    shippingZip: chance.zip(),
    email: chance.email(),
    user: chance.natural({min: 1, max: numOfUsers})
  })
})

const productCategoryAssociations = []

for (let i = 1; i <= numOfProducts; i++) {
  const numOfAssocs = chance.natural({min: 1, max: 3})
  const assocs = chance.unique(
    () => chance.natural({min: 1, max: numOfCategories}),
    numOfAssocs
  )
  for (let j = 0; j < numOfAssocs; j++) {
    productCategoryAssociations.push({productId: i, categoryId: assocs[j]})
  }
}

const lineItemAssociations = []

for (let i = 1; i <= numOfOrders; i++) {
  const numOfAssocs = chance.natural({min: 1, max: 5})
  const assocs = chance.unique(
    () => chance.natural({min: 1, max: numOfProducts}),
    numOfAssocs
  )
  for (let j = 0; j < numOfAssocs; j++) {
    lineItemAssociations.push({
      orderId: i,
      productId: assocs[j],
      quantity: chance.natural({min: 1, max: 15}),
      itemPrice: chance.natural({min: 400, max: 150000})
    })
  }
}

async function seed() {
  await db.sync({force: true})
  console.log(`db ${db.config.database} synced!`)

  await Category.bulkCreate(
    chance.unique(chance.word, numOfCategories).map(w => ({name: w}))
  )
  await Artist.bulkCreate(chance.n(chance.artist, numOfArtists))
  await Product.bulkCreate(chance.n(chance.product, numOfProducts))
  await User.bulkCreate(chance.n(chance.user, numOfUsers), {
    individualHooks: true
  })
  await Review.bulkCreate(chance.n(chance.review, numOfReviews), {
    individualHooks: true
  })
  await Order.bulkCreate(chance.n(chance.order, numOfOrders))
  await ProductCategory.bulkCreate(productCategoryAssociations)
  await LineItem.bulkCreate(lineItemAssociations)

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
