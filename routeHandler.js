const helper = require('./helper');
const db = require('./db/dbHelper');

function handleWebhook(req, res) {
  req.on('data', (data) => {
    let json = JSON.parse(data.toString());

    console.log(json);

    // User installs the integration
    if (json.action === 'created' && json.installation) {

    }

    // User deletes the integration
    if (json.action === 'deleted' && json.installation) {

    }
    // let repoId = json.repository.id;
    helper.getAccessToken(1825, (accessToken) => {
      console.log(accessToken);
    });
  });

  res.status(201).send();
}

module.exports = {
  handleWebhook: handleWebhook
}