const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/login.model');
const { CustomAPIError, BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await model.findUser(email);
  if (!user) {
    const err = new CustomAPIError('Please register');
    return res.send({ msg: err.message });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    const token = jwt.sign({ id: user.id, email: user.email }, `${user.id}`, {
      expiresIn: '30s',
    });
    const result = await model.saveToken(user.email, token);
    res.status(200).json({
      msg: `User Loged. You can see your info with url:http://localhost:3000${req.url}/${user.id}`,
      token: result.token,
    });
  } else {
    const err = new BadRequestError('Please insert correct password');
    res.send({ msg: err.message });
  }
};

module.exports = { login };
