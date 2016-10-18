const auth = require('./authHelper');
const db = require('./db/dbHelper');
const util = require('./utility');
const baseUrl = require('./config').BASE_URL;
const request = require('request');

function install(username, installation_id) {
  db.User.create({
    username: username,
    installation_id: installation_id
  })
  .then(() => console.log('user saved'))
  .catch((err) => console.log(err));
}

function uninstall(username) {
  db.User.destroy({ where: { username: username } })
  .then(() => console.log('user removed'))
  .catch((err) => console.log(err));
}

function comment(username, commentUrl) {
  db.User.getInstallationId(username)
  .then((user) => {
    auth.getAccessToken(user.installation_id, (access) => {
      access = JSON.parse(access);

      const options = {
        url: commentUrl,
        json: {
          body: baseUrl + '/' + util.shortCode(commentUrl),
        },
        headers: {
            'User-Agent': 'GitVid',
            'Accept': 'application/json',
            'Authorization': `Bearer ${(access.token)}`
        },
      };

      commentOnIssue(options);
    });
  })
}

function commentOnIssue(options) {
  request.post(options, (err, res, body) => {
    if (err) console.log('request failed:', err);
    console.log('status code:', res.statusCode);
    console.log('Comment successful!');
  });
}

module.exports = {
  install: install,
  uninstall: uninstall,
  comment: comment
};