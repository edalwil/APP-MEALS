//importamos express
const express = require('express');

//importamos los middlewares
const { validatorToken } = require('../middlewares/validateToken.middlewares');

//importamos controllers
const {
  newOrders,
  ordersComplet,
  ordersCanceled,
  listOrderUser,
} = require('../controllers/orders.controlles');

//creamos una variable con otro nombre app
const router = express.Router();

//logica endpoint

//usuario login
router.use(validatorToken);

//me
router.get('/me', listOrderUser);

//nueva orden
router.post('/', newOrders);

//orden compeltada
router.patch('/:id', ordersComplet);

//orden cancelada
router.delete('/:id', ordersCanceled);

//exportamos el archivo
module.exports = { ordersRouter: router };
