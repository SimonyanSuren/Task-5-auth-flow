const bcrypt = require('bcryptjs');
const model = require('../models/register.model');
const { CustomAPIError } = require('../errors');

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

module.exports = { register };
