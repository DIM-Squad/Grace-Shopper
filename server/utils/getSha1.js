'use strict'

const crypto = require('crypto')

module.exports = function getSha1(data) {
  return crypto
    .createHash('sha1')
    .update(data)
    .digest('hex')
}

// module.exports = function hash(key) {
//   let hashedKey = 0
//   for (let i = 0; i < key.length; i++) {
//     hashedKey += key.charCodeAt(i)
//   }
//   return hashedKey % 20
// }
