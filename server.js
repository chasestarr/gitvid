
const express = require('express');
const handler = require('./routeHandler');

const app = express();

app.post('/comment', handler.handleComment);

const port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log('server started at:', port);
});