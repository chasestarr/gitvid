const helper = require('./helper');

function handleComment(req, res) {
  req.on('data', (data) => {
    let json = data.toString();
  });
  res.status(201).send();
}

module.exports = {
  handleComment: handleComment
}