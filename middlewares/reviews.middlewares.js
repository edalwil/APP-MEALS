//importamos model
const { Reviews } = require('../models/reviews.models');
const { Restaurants } = require('../models/restaurants.models');

//utils
const { AppError } = require('../utils/appError');

//funciones middle para buscar un revievs
const reviewsExist = async (req, res, next) => {
  try {
    //id del usuario
    const { restaurantId, id } = req.params;

    //buscamos el usuario con el id
    const searchReview = await Reviews.findOne({ where: { id } });

    // validamos si existe el usuario
    if (!searchReview) {
      return next(new AppError('id does not exist', 404));
    }

    //buscar el restaurante
    const searchRestarunte = await Restaurants.findOne({
      where: { id: restaurantId, status: 'active' },
    });

    //validamos si el restaurante existe
    if (!searchRestarunte) {
      return next(new AppError('restaurants does not exis', 404));
    }

    //enviamos la informacion encontrada del
    req.reviewsId = searchReview;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { reviewsExist };
