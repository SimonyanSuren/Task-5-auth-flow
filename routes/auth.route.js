const authRouter = require('express').Router();
const { login, register } = require('../controllers/auth.controller');
const { getOneUser } = require('../controllers/users.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');

authRouter.post('/login', login);
authRouter.get('/login/:id', authenticationMiddleware, getOneUser);
authRouter.post('/register', register);

module.exports = authRouter;
