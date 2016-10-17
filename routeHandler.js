const helper = require('./helper');

function handleComment(req, res) {
  req.on('data', (data) => {
    let json = JSON.parse(data.toString());
    console.log(json);
    let repoId = json.repository.id;
    helper.getAccessToken(1825, (accessToken) => {
      console.log(accessToken);
    });
  });

  res.status(201).send();
}

module.exports = {
  handleComment: handleComment
}