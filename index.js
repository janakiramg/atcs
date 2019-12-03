require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/', (req, res) => res.send('Welcome to air-traffic control system!!!'));
app.use('/', routes);
app.listen(port, () => console.log(`ATCS app listening on port ${port}!`));
