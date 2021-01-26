const router = require('express').Router();
const {
  getUsers, getUserById, createUser, getCurrentUser,
} = require('../controllers/users');
const { userIdValidation } = require('../middlewares/serverDataValidator');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', userIdValidation, getUserById);

router.post('/users', createUser);

module.exports = router;
