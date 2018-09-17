module.exports = (req, res, next) => {
  //users can't access anything if they have been deleted from the system, but an admin can still access their info
  req.user.isAdmin ||
  (req.user.id === Number(req.params.userId) && !req.user.deletedAt)
    ? next()
    : res.status(403).send()
}
