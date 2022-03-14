const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('No token provided'));
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = req.params.id;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id, email } = decoded;
    req.user = { id, email };
    next();
  } catch (error) {
    next(new UnauthenticatedError('Not authorized to access this route'));
  }
};

module.exports = authenticationMiddleware;
