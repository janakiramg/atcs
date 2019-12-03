function handleError(error, req, res, httpVerb) {
  console.log(`Failed to ${httpVerb} ${req.baseUrl.replace('/api/', '')}`);
  console.log(error);
  res.status(500).send({ message: error.message });
}

module.exports = { handleError };
