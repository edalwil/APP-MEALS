//importamos express
const express = require('express');

//importamos los middlewares
const { restauranteExist } = require('../middlewares/restaurants.middlewares');
const {
  validatorToken,
  protectAdmin,
  protectAccountOwnerRestaurants,
} = require('../middlewares/validateToken.middlewares');
const {
  restaurantsValidator,
  ckeckValidator,
} = require('../middlewares/validations.middlewares');

//importamos constrollers
const {
  crearteRestaurants,
  listRestaurants,
  searchRestaurant,
  updateRestaurante,
  deleteRestaurant,
} = require('../controllers/restaurants.controllers');

//creamos una varible con otro nombre de app
const router = express.Router();

//logica endpoint

//listado de restaurants
router.get('/', listRestaurants);

//restaurantes id
router.get('/:id', restauranteExist, searchRestaurant);

//usuario logina
router.use(validatorToken);

//crear restaurante
router.post(
  '/',
  protectAdmin,
  restaurantsValidator,
  ckeckValidator,
  crearteRestaurants
);

//route id
router
  .route('/:id')
  .patch(protectAdmin, restauranteExist, updateRestaurante)
  .delete(protectAdmin, restauranteExist, deleteRestaurant);

//exportamos el archivo
module.exports = { restaurantsRouter: router };
