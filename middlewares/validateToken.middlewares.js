const { User } = require('../models/users.models'); //models
const jwt = require('jsonwebtoken'); //libreria jsonwebtoken
const { AppError } = require('../utils/appError'); //utils

//validamos el token
const validatorToken = async (req, res, next) => {
  try {
    let token;

    //confirmar si token esta en el header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      //quitamos bearer del token
      token = req.headers.authorization.split(' ')[1];
    }

    //confirmar si el token existe
    if (!token) {
      return next(new AppError('credenciales invalid', 404));
    }

    //varificar token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //retornar vairable decoded
    const user = await User.findOne({
      where: { id: decoded.id, status: 'active' },
    });

    //validamos users
    if (!user) {
      return next(
        new AppError('the owner of this token is not loger available', 404)
      );
    }

    //enviamos los datos en req
    req.sessionUser = user;

    next();
  } catch (error) {
    next(error);
  }
};

const protectAdmin = async (req, res, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError('Access not granted', 403));
  }
  next();
};

const protectAccountOwnerUser = async (req, res, next) => {
  // Obtenga el usuario de la sesión actual y el usuario que se actualizará
  const { sessionUser, user } = req;

  console.log(sessionUser.id, user.id);

  // compramos las id
  if (sessionUser.id !== User.id) {
    return next(new AppError('you do not own this account', 403));
  }

  //si las id son iguales pasa la respuesta
  next();
};

const protectAccountOwnerRestaurants = async (req, res, next) => {
  // Obtenga el usuario de la sesión actual y el usuario que se actualizará
  const { sessionUser, restaurantId } = req;

  //compramos las id
  if (sessionUser.id !== restaurantId.id) {
    return next(new AppError('you do not own this account', 403));
  }

  //si las id son iguales pasa la respuesta
  next();
};

module.exports = {
  validatorToken,
  protectAccountOwnerUser,
  protectAccountOwnerRestaurants,
  protectAdmin,
};
