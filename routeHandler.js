const integration = require('./integration');

function handleWebhook(req, res) {
  req.on('data', (data) => {
    let json = JSON.parse(data.toString());

    // User installs the integration
    if (json.action === 'created' && json.installation) {
      const username = json.installation.account.login;
      const installationId = json.installation.id;
      integration.install(username, installationId);
    }

    // User deletes the integration
    if (json.action === 'deleted' && json.installation) {
      const username = json.installation.account.login;
      integration.uninstall(username);
    }

    // New comment event
    if (json.action === 'created' && json.issue) {
      const username = json.repository.owner.login;
      const command = json.comment.body.split(' ')[0].toLowerCase();
      if (command === '!gitvid') {
        integration.comment(username);
      }
    }
  });
  res.status(201).send();
}

module.exports = {
  handleWebhook: handleWebhook
}