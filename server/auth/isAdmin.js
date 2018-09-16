module.exports = (req, res, next) => {
  req.user.isAdmin ? next() : res.status(403).send()
}
