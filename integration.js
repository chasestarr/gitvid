const auth = require('./authHelper');
const db = require('./db/dbHelper');

function install(username, installation_id) {
  // add user to db
  db.User.create({
    username: username,
    installation_id: installation_id
  })
  .then(() => console.log('user saved'))
  .catch((err) => console.log(err));
}

function uninstall(username) {
  // remove user from db
  db.User.destroy({ where: { username: username } })
  .then(() => console.log('user removed'))
  .catch((err) => console.log(err));
}

function comment(username) {
  // handle comment
  db.User.find({ where: { username: username } })
  .then((user) => {
    auth.getAccessToken(user.installation_id, (accessToken) => {
      console.log(accessToken);
    });
  })
}

module.exports = {
  install: install,
  uninstall: uninstall,
  comment: comment
};