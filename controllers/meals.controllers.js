const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');
const { AppError } = require('../utils/appError');

//crear una platillo de comida
const createMeals = async (req, res, next) => {
  try {
    //id del restaurante
    const { id } = req.params;

    //buscamos el resturante
    const searchRestaurants = await Restaurants.findOne({
      where: { id, status: 'active' },
    });

    //validamos si existe el resturante
    if (!searchRestaurants) {
      return next(new AppError('restaurants does not exist', 404));
    }

    //datos recibidos por el cliente
    const { name, price, restaurant } = req.body;

    //crear meals
    const newMeals = await Meals.create({ name, price, restaurantId: id });

    //enviamos la respuesta
    res.status(200).json({
      newMeals,
    });
  } catch (error) {
    next(error);
  }
};

//listado de meals
const listMeals = async (req, res, next) => {
  try {
    //buscamos listado de meals
    const searchMealsList = await Meals.findAll({
      where: { status: 'active' },
      include: [{ model: Restaurants }],
    });

    // enviamos la respuesta
    res.status(200).json({
      searchMealsList,
    });
  } catch (error) {
    next(error);
  }
};

//buscar meals por id
const searchMealsId = async (req, res, next) => {
  try {
    //datos recibidos de middlewares
    const { mealsId } = req;

    //enviar la peticion
    res.status(200).json({
      mealsId,
    });
  } catch (error) {
    next(error);
  }
};

//modicar meals
const updateMeals = async (req, res, next) => {
  try {
    //datos recibidos por middlewares
    const { mealsId } = req;

    //datos recibidos por el cliente
    const { name, price } = req.body;

    //modificamos meals
    await mealsId.update({ name, price });

    //enviamos la peticions
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

//eliminar meals
const deleteMeals = async (req, res, next) => {
  try {
    //datos recibidos por middlewares
    const { mealsId } = req;

    //eliminamos meals
    await mealsId.update({ status: 'delete' });

    //enviamos respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMeals,
  listMeals,
  searchMealsId,
  updateMeals,
  deleteMeals,
};
