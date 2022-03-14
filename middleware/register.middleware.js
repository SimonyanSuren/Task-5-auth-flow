const validator = require('validator');
const { BadRequestError } = require('../errors');

const registerMiddleware = (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return next(new BadRequestError('Please provide email and password'));
  }
  if (!validator.isEmail(user.email)) {
    next(new BadRequestError('Please provide correct email'));
  }
  next();
};

module.exports = { registerMiddleware };
