const routes = require('express').Router();
const aircraftRoute = require('./aircraft');

routes.use('/api/aircraft', aircraftRoute);

module.exports = routes;
