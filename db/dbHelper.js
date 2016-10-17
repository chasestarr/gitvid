var Sequelize = require('sequelize');
var sequelize = new Sequelize('gitvid', 'vid', null, { dialect: 'sqlite', storage: './db/db.sqlite' });

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  installation_id: Sequelize.INTEGER
});

User.sync();

module.exports = {
  User: User
};