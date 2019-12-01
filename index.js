require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Aircraft } = require('./config/db');
const port = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to air-traffic control system!!!'));

// Create aircraft
app.post('/api/aircraft', (req, res) => {
  Aircraft.create(req.body)
    .then(aircraft => res.json(aircraft))
    .catch(error => {
      res.status(500);
      return res.json({
        type: 'error',
        message: error.message
      });
    });
});

// get all aircrafts
app.get('/api/aircraft', (req, res) => {
  Aircraft.findAll()
    .then(aircrafts => res.json(aircrafts))
    .catch(error => {
      res.status(500);
      return res.json({
        type: 'error',
        message: error.message
      });
    });
});

app.listen(port, () => console.log(`ATCS app listening on port ${port}!`));
