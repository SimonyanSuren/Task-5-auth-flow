const router = require('express').Router();
const { register } = require('../controllers/register.controller');
const { registerMiddleware } = require('../middleware/register.middleware');

router.route('/register').post(registerMiddleware, register);

module.exports = router;
