var Sequelize = require('sequelize');
var sequelize = new Sequelize('gitvid', 'vid', null, { dialect: 'sqlite', storage: './db.sqlite' });

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  installation_id: Sequelize.INTEGER
});

User.sync({force: true}).then(() => {
  return User.create({
    username: 'chasestar',
    installation_id: 1825
  });
});