const { Reviews } = require('../models/reviews.models'); //importamos Reviews
const { Restaurants } = require('../models/restaurants.models'); //importamos restaurants
const { AppError } = require('../utils/appError');

//creamos un nuevo reviews
const createReview = async (req, res, next) => {
  try {
    //id del restaurante
    const { id } = req.params;

    //datos del usuario en login
    const { sessionUser } = req;

    //buscar el restaurante
    const searchRestarunte = await Restaurants.findOne({
      where: { id, status: 'active' },
    });

    //validamos si el restaurante existe
    if (!searchRestarunte) {
      return next(new AppError('restaurants does not exis', 404));
    }

    //datos recibidos por el cliente
    const { comment, rating } = req.body;

    //userId => usuario que esta logiado
    //creamos reviews
    const newComment = await Reviews.create({
      userId: sessionUser.id,
      comment,
      restaurantId: id,
      rating,
    });

    //enviamos la peticion
    res.status(200).json({
      newComment,
    });
  } catch (error) {
    next(error);
  }
};

//modicar reviews
const updateReview = async (req, res, next) => {
  try {
    //datos del middleware reviewsExist
    const { reviewsId } = req;

    //datos de middleware usuario login
    const { sessionUser } = req;

    //validamos si es reviewsId es del usuario
    if (sessionUser.id !== reviewsId.id) {
      return next(new AppError('this comment is not from this user', 404));
    }

    //datos recibidos por el cliente
    const { comment, rating } = req.body;

    //moficamos reviews
    await reviewsId.update({ comment, rating });

    //envimos la peticion
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

//delete reviews
const deleteReview = async (req, res, next) => {
  try {
    //recibimos los datos de middleware
    const { reviewsId } = req;

    //datos de middleware usuario login
    const { sessionUser } = req;

    //validamos si es reviewsId es del usuario
    if (sessionUser.id !== reviewsId.id) {
      return next(new AppError('this comment is not from this user', 404));
    }

    //eliminamos el reviews
    await reviewsId.update({ status: 'delete' });

    //enviamos la respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createReview, updateReview, deleteReview };
