require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const model = require('../models/auth.model');
const { CustomAPIError, BadRequestError } = require('../errors');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Please provide email or password'));
  }
  if (!validator.isEmail(email)) {
    return next(
      new BadRequestError('Please provide correct email or password')
    );
  }

  const user = await model.findUser(email);

  if (!user) {
    return next(new BadRequestError('Please register'));
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
    const err = new BadRequestError('Please insert correct email or password');
    res.json({ msg: err.message });
  }
};

const register = async (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return next(new BadRequestError('Please provide email or password'));
  }
  if (!validator.isEmail(user.email)) {
    return next(
      new BadRequestError('Please provide correct email or password')
    );
  }

  const ifUserExists = await model.findUser(user.email);

  if (ifUserExists) {
    const err = new CustomAPIError('User already exists');
    res.status(409).json({ msg: err.message });
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
    res.status(201).json({ msg: 'User created' });
  }
};

module.exports = { login, register };
