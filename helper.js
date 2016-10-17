const jwt = require('jwt-simple');
const integrationId = require('./config').INTEGRATION_ID;
const keyPath = require('./config').KEY_PATH;

const key = fs.readFileSync(keyPath);

function _integrationAuth() {
  const time = Math.round(Date.now() / 1000);
  return jwt.encode({
        iat: time,
        exp: time + 60,
        iss: integrationId,
    }, key, 'RS256');
}

function getAccessToken(id, cb) {
  const options = {
    url: `https://api.github.com/installations/${id}/access_tokens`,
    headers: {
      'User-Agent': 'GitVid',
      Accept: 'application/vnd.github.machine-man-preview+json',
      Authorization: `Bearer ${_integration_token()}`
    }
  };
  request.post(options, (err, res, body) => {
    cb(body);
  });
}

module.exports = {
  getAccessToken: getAccessToken
}