module.exports = (req, res, next) => {
  req.user.isAdmin || req.user.id === req.params.userId
    ? next()
    : res.status(401).send()
}
