// Product routes
const router = require('express').Router()
const {
  Product,
  Category,
  Artist,
  Review,
  User,
  ProductCategory
} = require('../db/models')
const Op = require('sequelize').Op
const isAdmin = require('../auth/isAdmin')

module.exports = router

router.get('/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId)
  try {
    const product = await Product.findById(productId, {
      include: [
        {
          model: Review,
          include: [{model: User}]
        }
      ]
    })
    if (!product || product === {}) {
      res.status(404).end()
    } else {
      res.status(200).json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      include: [{model: Category}, {model: Artist}]
    })
    if (!productList.length) {
      res.status(404).end()
    } else {
      res.status(200).json(productList)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/search/:key', async (req, res, next) => {
  try {
    const matchingProducts = await Product.findAll({
      where: {name: {[Op.iLike]: '%' + req.params.key + '%'}},
      limit: 20,
      include: [{model: Artist}]
    })
    if (matchingProducts) {
      res.status(200).json(matchingProducts)
    } else {
      res.status(200).json([])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    res.status(200).json(
      (await Category.findById(Number(req.params.id), {
        include: [{model: Product, include: [{model: Artist}]}]
      })).products
    )
  } catch (err) {
    next(err)
  }
})

router.get('/featured/true', async (req, res, next) => {
  try {
    res.status(200).json(
      await Product.findAll({
        where: {
          featured: true,
          quantity: {[Op.gt]: 0}
        },
        include: {model: Artist}
      })
    )
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      name,
      price,
      featured,
      quantity,
      description,
      artist,
      size,
      categories
    } = req.body

    const artistEntry = await Artist.findOrCreate({
      where: {name: artist}
    }).spread((a, c) => a)

    const newProduct = await Product.create({
      name,
      price,
      featured,
      quantity,
      description,
      size,
      artistId: artistEntry.id
    })

    const categoryEntries = await Promise.all(
      categories.map(c => {
        if (c.id) return Promise.resolve(c)
        else return Category.findOrCreate({name: c.name})
      })
    )

    await Promise.all(
      categoryEntries.map(c =>
        ProductCategory.create({categoryId: c.id, productId: newProduct.id})
      )
    )

    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.update(req.body.product, {
      where: {id: Number(req.params.productId)},
      returning: true,
      plain: true
    })
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: Number(req.params.productId)}
    })
    res.status(202).send()
  } catch (err) {
    next(err)
  }
})
