const express = require('express');
const aircraftService = require('../services/aircraft');
const handleErrorService = require('../services/handleErrorService');

const router = express.Router({
  mergeParams: true
});

/**
 * Route to GET all aircraft
 */
router.get('/', async function(req, res) {
  try {
    const response = await aircraftService.findAll();
    res.send(response);
  } catch (error) {
    handleErrorService.handleError(error, req, res, 'findAll');
  }
});

/**
 * Route to POST a new aircraft
 */
router.post('/', async function(req, res) {
  try {
    const response = await aircraftService.create(req.body);
    res.send(response);
  } catch (error) {
    handleErrorService.handleError(error, req, res, 'create');
  }
});

/**
 * To dequeue a aircraft
 */
router.post('/dequeue', async function(req, res) {
  try {
    const response = await aircraftService.dequeue();
    res.send(response);
  } catch (error) {
    handleErrorService.handleError(error, req, res, 'dequeue');
  }
});

module.exports = router;
