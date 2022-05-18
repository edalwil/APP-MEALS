//importamos express
const express = require('express');

//middleware
const { reviewsExist } = require('../middlewares/reviews.middlewares');
const {
  protectAccountOwnerRestaurants,
  validatorToken,
  protectAdmin,
} = require('../middlewares/validateToken.middlewares');

//constrollers
const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews.controllers');

//creamos una variable con otro nombre de app
const router = express.Router();

//logica endpoint
//usuario login
router.use(validatorToken);

//creamos la reseña
router.post('/reviews/:id', createReview);

//modicar la reseña
router.patch('/reviews/:restaurantId/:id', reviewsExist, updateReview);

//delete la reseña
router.delete('/reviews/:restaurantId/:id', reviewsExist, deleteReview);

//exportamos el archivo
module.exports = { reviewsRouter: router };
