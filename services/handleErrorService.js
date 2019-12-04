const { logger } = require('../config/winston');

function handleError(error, req, res, httpVerb) {
  logger.error(`Failed to ${httpVerb} ${req.baseUrl.replace('/api/', '')}`);
  logger.error(error);
  res.status(500).send({ message: error.message });
}

module.exports = { handleError };
