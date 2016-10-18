const https = require('https');
const fs = require('fs');
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

// const port = process.env.PORT || 7000;
// app.listen(port, () => {
//     console.log('server started at:', port);
// });

const options = {
    key: fs.readFileSync(require('./config').SSL_KEY),
    cert: fs.readFileSync(require('./config').SSL_CERT)
}

https.createServer(options, app).listen(8000, () => {
    console.log('https server listening on 8000');
});