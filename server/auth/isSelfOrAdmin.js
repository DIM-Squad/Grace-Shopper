module.exports = (req, res, next) => {
  req.user.isAdmin || req.user.id === Number(req.params.userId)
    ? next()
    : res.status(403).send()
}
