const purify = require('../util/purify');

const sanitizeRequest = (req, res, next) => {
  req.body = purify(req.body);
  req.params = purify(req.params);
  next();
};

module.exports = sanitizeRequest;
