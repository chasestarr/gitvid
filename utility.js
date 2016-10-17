const crypto = require('crypto');

function shortCode(key) {
  var shasum = crypto.createHash('sha1');
  shasum.update(key);
  return shasum.digest('hex').slice(0, 5);
}

module.exports = {
  shortCode: shortCode
}