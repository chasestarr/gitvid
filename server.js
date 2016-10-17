const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./routeHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.post('/comment', handler.handleWebhook);
app.get('/token', handler.handleToken);
app.get('/', (req, res) => res.status(200).render('index.html'));
app.get('/:shortCode', handler.navToRoom);

const port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log('server started at:', port);
});