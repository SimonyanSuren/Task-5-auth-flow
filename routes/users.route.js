const router = require('express').Router();

const {
  addUsers,
  getUsers,
  removeUsers,
  addOneUser,
  getOneUser,
  putOneUser,
  removeOneUser,
} = require('../controllers/users.controller');

router.route('/users').post(addUsers).get(getUsers).delete(removeUsers);
router.route('/user').post(addOneUser).put(putOneUser);
router.get('/user/:id', getOneUser);
router.delete('/user/:id', removeOneUser);

module.exports = router;
