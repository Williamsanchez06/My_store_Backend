const express = require('express');
const router = express.Router();

const validatorHandler = require('./../middlewares/validatorHandler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./../schemas/userSchema');

const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);

router.get('/:id', validatorHandler(getUserSchema, 'params'), getUserId);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

router.delete('/:id', validatorHandler(getUserSchema, 'params'), deleteUser);

module.exports = router;
