require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/auth.model');
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
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '300s',
    });
    res.status(200).json({
      msg: `User Loged. You can see your info with url:http://localhost:3000${req.url}/${user.id}`,
      token: token,
    });
  } else {
    const err = new BadRequestError('Please insert correct password');
    res.send({ msg: err.message });
  }
};

const register = async (req, res) => {
  const user = req.body;
  const ifUserExists = await model.findUser(user.email);

  if (ifUserExists) {
    const err = new CustomAPIError('User already exists');
    res.send({ msg: err.message });
  } else {
    const salt = bcrypt.genSaltSync(10);
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw new Error();
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) {
          throw new Error();
        }
        user.password = hash;
        const result = await model.addUserToDB(user);
      });
    });
    res.status(200).send({ msg: 'User created' });
  }
};

module.exports = { login, register };
