const router = require('express').Router();
const { login } = require('../controllers/login.controller');
const { getOneUser } = require('../controllers/users.controller');
const authenticationMiddleware = require('../middleware/auth.middleware');
const { registerMiddleware } = require('../middleware/register.middleware');

router.route('/login').post(registerMiddleware, login);
router.route('/login/:id').get(authenticationMiddleware, getOneUser);

module.exports = router;
