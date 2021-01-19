const router = require('express').Router();
const { getUsers, getUserById, createUser, login, getCurrentUser } = require('../controllers/users');


// router.post('/signup', createUser);
// router.post('/signin', login);
router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', getUserById);

router.post('/users', createUser);

module.exports = router;
