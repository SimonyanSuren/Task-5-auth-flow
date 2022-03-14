const router = require('express').Router();
const { login, register } = require('../controllers/auth.controller');
const { getOneUser } = require('../controllers/users.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const { registerMiddleware } = require('../middleware/register.middleware');

router.post('/login', registerMiddleware, login);
router.get('/login/:id', authenticationMiddleware, getOneUser);
router.post('/register', registerMiddleware, register);

module.exports = router;
