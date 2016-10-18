const Sequelize = require('sequelize');
const sequelize = new Sequelize('gitvid', 'vid', null, { dialect: 'sqlite', storage: './db/db.sqlite' });

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  installation_id: Sequelize.INTEGER
});

User.sync();

User.getInstallationId = function(username) {
  return User.find({ where: { username: username } });
};

module.exports = {
  User: User
};