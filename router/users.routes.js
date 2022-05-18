//importamos express
const express = require('express');

//importamos middleware
const { userExists } = require('../middlewares/users.middlewares');
const {
  ckeckValidator,
  loginValidator,
  userValidator,
  userValidatorModific,
} = require('../middlewares/validations.middlewares');
const {
  protectAccountOwnerUser,
  validatorToken,
} = require('../middlewares/validateToken.middlewares');

//importamos controllers
const {
  listUsers,
  createUser,
  updateUser,
  searchUser,
  deleteUser,
  loginUser,
} = require('../controllers/users.controllers');

//creamos una variable con otro nombre de app
const router = express.Router();

//logica endpoint

//login
router.post('/login', loginValidator, ckeckValidator, loginUser);

//crear nuevo usuarios
router.post('/signup', userValidator, ckeckValidator, createUser);

//usuario logiado
router.use(validatorToken);

//listado ordenes del usuario en sescion
router.get('/orders', listUsers);

// solo la orden espesifica
router.get('/orders/:id', userExists, searchUser);

//routes id
router
  .route('/:id')
  .patch(
    userValidatorModific,
    ckeckValidator,
    userExists,
    protectAccountOwnerUser,
    updateUser
  )
  .delete(userExists, protectAccountOwnerUser, deleteUser);

//exportamos el archivo
module.exports = { userRouter: router };
