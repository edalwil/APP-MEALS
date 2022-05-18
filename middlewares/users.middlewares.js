//importamos model user
const { User } = require('../models/users.models');
const { Restaurants } = require('../models/restaurants.models');

//utilis
const { AppError } = require('../utils/appError');

//funcion middlewares para buscar usuario
const userExists = async (req, res, next) => {
  try {
    //   id del usuario
    const { id } = req.params;

    //   buscamos el usuario con el id
    const searchUser = await User.findOne({
      where: { id, status: 'active' },
    });

    //   validamos si el usuario exsite
    if (!searchUser) {
      return next(new AppError('user does not exist', 404));
    }

    //   envio la informacion encontrada
    req.user = searchUser;

    //   no visible la contraseña
    searchUser.password = undefined;

    next();
  } catch (error) {
    next(error);
  }
};

//expotamos la funcion
module.exports = { userExists };
