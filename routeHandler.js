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
        const fullName = json.repository.full_name;
        const issueNumber = json.issue.number;
        const commentUrl = `https://api.github.com/repos/${fullName}/issues/${issueNumber}/comments`;

        integration.comment(username, commentUrl);
      }
    }
  });
  res.status(201).send();
}

function navToRoom(req, res) {
  const shortCode = req.params.shortCode;
  res.status(200).send(shortCode);
}

module.exports = {
  handleWebhook: handleWebhook,
  navToRoom: navToRoom
};