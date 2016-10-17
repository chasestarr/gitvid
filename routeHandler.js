
function handleComment(req, res) {
  req.on('data', (data) => console.log(data.toString()));
  res.status(201).send();
}

module.exports = {
  handleComment: handleComment
}