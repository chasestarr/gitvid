const JWT = require('jwt-simple');
const integrationId = require('./config').INTEGRATION_ID;
const keyPath = require('./config').KEY_PATH;

const key = fs.readFileSync(keyPath);

function integrationAuth() {
  const time = Math.round(Date.now() / 1000);
  return JWT.encode({
        iat: time,
        exp: time + 60,
        iss: integrationId,
    }, key, 'RS256');
}

module.exports = {
  integrationAuth: integrationAuth
}