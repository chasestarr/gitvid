const fs = require('fs');
const jwt = require('jwt-simple');
const request = require('request');
const integrationId = require('./config').INTEGRATION_ID;
const keyPath = require('./config').KEY_PATH;

const t = require('./twilioConfig');
const AccessToken = require('twilio').AccessToken;
const ConversationsGrant = AccessToken.ConversationsGrant;

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
      Authorization: `Bearer ${_integrationAuth()}`
    }
  };
  request.post(options, (err, res, body) => {
    if (err) console.log('request failed:', err);
    cb(body);
  });
}

function getTwilioToken() {
  let token = new AccessToken(
    t.TWILIO_ACCOUNT_SID,
    t.TWILIO_API_KEY,
    t.TWILIO_API_SECRET
  );

  let grant = new ConversationsGrant();
  grant.configurationProfileSid = t.TWILIO_CONFIGURATION_SID;
  token.addGrant(grant);

  return { token: token.toJwt() };
}

module.exports = {
  getAccessToken: getAccessToken,
  getTwilioToken: getTwilioToken
}