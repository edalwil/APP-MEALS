//importamos express
const express = require('express');

//importamos los middlewares
const { mealsExist } = require('../middlewares/meals.middlewares');
const {
  validatorToken,
  protectAdmin,
} = require('../middlewares/validateToken.middlewares');
const {
  mealsValidator,
  ckeckValidator,
} = require('../middlewares/validations.middlewares');

//importamos controllers
const {
  createMeals,
  listMeals,
  searchMealsId,
  updateMeals,
  deleteMeals,
} = require('../controllers/meals.controllers');

//creamos una variable con otro nombre de app
const router = express.Router();

//logica endpoint

//listado de meals
router.get('/', listMeals);

//meals por id
router.get('/:id', mealsExist, searchMealsId);

//usuario login
router.use(validatorToken);

//crear meals
router.post('/:id', protectAdmin, mealsValidator, ckeckValidator, createMeals);

//buscar meals id
router
  .route('/:id')
  .patch(protectAdmin, mealsExist, updateMeals)
  .delete(protectAdmin, mealsExist, deleteMeals);

//exportamos el archivo
module.exports = { mealsRouter: router };
