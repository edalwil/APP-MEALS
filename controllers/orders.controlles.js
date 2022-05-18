const { Orders } = require('../models/order.models');
const { Meals } = require('../models/meals.models');
const { User } = require('../models/users.models');
const { Restaurants } = require('../models/restaurants.models');
const { AppError } = require('../utils/appError');

//crear una nueva orden
const newOrders = async (req, res, next) => {
  try {
    //recibimos datos de loginmiddlewares
    const { sessionUser } = req;

    //datos del cliente
    const { mealId, quantity, totalPrice } = req.body;

    //buscar meals
    const searchMeals = await Meals.findOne({
      where: { id: mealId, status: 'active' },
      include: [{ model: Restaurants }],
    });

    //validamos si la comida existe
    if (!searchMeals) {
      return next(new AppError('meals does not exist', 404));
    }

    //buscar el restaurante este existete
    const searchRestaurants = await Restaurants.findOne({
      where: { id: searchMeals.restaurant.id, status: 'active' },
    });

    //validamos informacion
    if (!searchRestaurants) {
      return next(new AppError('restaurants does not exist', 404));
    }

    //buscar usuario
    const searchUsers = await User.findOne({
      where: { id: sessionUser.id, status: 'active' },
    });

    //validamos usuario
    if (!searchUsers) {
      return next(new AppError('users does not exist', 404));
    }

    //valor total
    const totalProducts = quantity * searchMeals.price;

    //creamos a nueva orden
    const newOrdersMeals = await Orders.create({
      mealId,
      userId: sessionUser.id,
      quantity,
      totalPrice: totalProducts,
    });
    res.status(200).json({
      newOrdersMeals,
    });
  } catch (error) {
    next(error);
  }
};

//orden completada
const ordersComplet = async (req, res, next) => {
  try {
    //id del la orden
    const { id } = req.params;

    //buscamos la orden por el id
    const ordersId = await Orders.findOne({ where: { id } });

    //datos del usuario logiado
    const { sessionUser } = req;

    if (sessionUser.id !== ordersId.userId) {
      return next(new AppError('this order is not yours', 404));
    }

    //valida que la orden este activa
    if (ordersId.status !== 'active') {
      return next(new AppError('orders daes not existe', 404));
    }

    //modificamos el status
    await ordersId.update({ status: 'completed' });

    //enviamos la respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

//orden cancelada
const ordersCanceled = async (req, res, next) => {
  try {
    //id del la orden
    const { id } = req.params;

    //buscamos la orden por el id
    const ordersId = await Orders.findOne({ where: { id } });

    //datos del usuario logiado
    const { sessionUser } = req;

    if (sessionUser.id !== ordersId.userId) {
      return next(new AppError('this order is not yours', 404));
    }

    //valida que la orden este activa
    if (ordersId.status !== 'active') {
      return next(new AppError('orders daes not existe', 404));
    }

    //modificamos el status
    await ordersId.update({ status: 'cancelled' });

    //enviamos la respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

//listado de ordenes del cliente
const listOrderUser = async (req, res, next) => {
  try {
    //datos recibidos del loginmiddlewares
    const { sessionUser } = req;

    //buscar usuario y agregar datos de ordenes y restautate
    const searchUsers = await User.findOne({
      where: {
        id: sessionUser.id,
        status: 'active',
      },
      include: [
        {
          model: Orders,
          include: [{ model: Meals, include: [{ model: Restaurants }] }],
        },
      ],
    });

    searchUsers.password = undefined;

    //enviamos la respuesta
    res.status(200).json({
      searchUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newOrders, ordersComplet, ordersCanceled, listOrderUser };
