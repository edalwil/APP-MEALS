//importamos model restaurants
const { Restaurants } = require('../models/restaurants.models');
const { Reviews } = require('../models/reviews.models');

//crear restaurante en la plataforma de la plataforma
const crearteRestaurants = async (req, res, next) => {
  try {
    //datos enviados
    const { name, address, rating } = req.body;

    //crear restaurants nuevo
    const newRestaurants = await Restaurants.create({ name, address, rating });

    //enviamos la peticiones
    res.status(200).json({
      newRestaurants,
    });
  } catch (error) {
    next(error);
  }
};

//listado de restaurantes con status => active
const listRestaurants = async (req, res, next) => {
  try {
    //listado de restaurants activos
    const listRestaurantsActive = await Restaurants.findAll({
      where: { status: 'active' },
      include: [{ model: Reviews }],
    });

    //enviamos las peticion
    res.status(200).json({
      listRestaurantsActive,
    });
  } catch (error) {
    next(error);
  }
};

//busqueda de un solo restaurante
const searchRestaurant = async (req, res, next) => {
  try {
    //datos recibidos del middleware
    const { restaurantId } = req;

    //enviamos la peticion
    res.status(200).json({
      restaurantId,
    });
  } catch (error) {
    next(error);
  }
};

//modifcar datos del resturante
const updateRestaurante = async (req, res, next) => {
  try {
    //datos recibidos del middleware
    const { restaurantId } = req;

    //datos enviados por el cliete
    const { name, address } = req.body;

    //modificamos datos del resturantes
    const updateRestauranteId = await restaurantId.update({ name, address });

    //enviamos la peticion
    res.status(200).json({
      updateRestauranteId,
    });
  } catch (error) {
    next(error);
  }
};

//Deshabilitar restaurant.
const deleteRestaurant = async (req, res, next) => {
  const { restaurantId } = req;

  await restaurantId.update({ status: 'delete' });

  res.status(200).json({
    status: 'sucess',
  });
};

module.exports = {
  crearteRestaurants,
  listRestaurants,
  searchRestaurant,
  updateRestaurante,
  deleteRestaurant,
};
