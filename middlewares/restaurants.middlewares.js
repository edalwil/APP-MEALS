//importamos model restaurants
const { Restaurants } = require('../models/restaurants.models');
const { Reviews } = require('../models/reviews.models');

//utils
const { AppError } = require('../utils/appError');

//funcion middle para buscar un restaurante
const restauranteExist = async (req, res, next) => {
  try {
    //id del usuario
    const { id } = req.params;

    //buscamos el usuario con el id
    const searchRestaurante = await Restaurants.findOne({
      where: { id, status: 'active' },
      include: [{ model: Reviews }],
    });

    //validamos si el usuario existe en
    if (!searchRestaurante) {
      return next(new AppError('Restaurant does not exist', 404));
    }

    //enviamos la informacion encontrada
    req.restaurantId = searchRestaurante;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { restauranteExist };
