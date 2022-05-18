const { User } = require('../models/users.models');
const { Orders } = require('../models/order.models');
const { Restaurants } = require('../models/restaurants.models');
const { Meals } = require('../models/meals.models');
const bcrypt = require('bcrypt');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');

//listado de usuarios // corrergir  Obtener todas las ordenes hechas por el usuario
const listUsers = async (req, res, next) => {
  try {
    //datos recibidos por validataToken
    const { sessionUser } = req;

    //buscamos todos los usuarios existentes
    const users = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: sessionUser.id },
      include: [
        {
          model: Orders,
          include: [{ model: Meals, include: [{ model: Restaurants }] }],
        },
      ],
    });

    //enviamos las peticiones
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

//crear usuario nuevo
const createUser = async (req, res, next) => {
  try {
    //recibimos los datos del cliente
    const { name, email, password, role } = req.body;

    //incriptamos las contraseñas
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    //crear nuevo usuario
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashPassword,
    });

    //no visible la contraseña
    newUser.password = undefined;

    //enviamos las peticiones
    res.status(200).json({
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

//modificar usuario
const updateUser = async (req, res, next) => {
  try {
    //datos enviado por middleware
    const { user } = req;

    console.log(user);

    //datos enviados por el cliente para modificar
    const { name, email } = req.body;

    //actualizamos el usuario
    await user.update({ name, email });

    //enviar la respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

//Obtener detalles de una sola orden dado un ID corrergir
const searchUser = async (req, res, next) => {
  try {
    //datos enviado por middleware
    const { sessionUser } = req;

    //datos del id de la orden
    const { id } = req.params;

    const searchUser = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: sessionUser.id },
      include: [
        {
          model: Orders,
          where: { id },
          include: [{ model: Meals, include: [{ model: Restaurants }] }],
        },
      ],
    });

    //enviar la respuesta
    res.status(200).json({
      searchUser,
    });
  } catch (error) {
    next(error);
  }
};

//eliminar usuario
const deleteUser = async (req, res, next) => {
  try {
    //datos enviado por middleware
    const { user } = req;

    //eliminamos el dato con update para cambiar el status
    await user.update({ status: 'delete' });

    //enviamos la respuesta
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {}
};

//login user
const loginUser = async (req, res, next) => {
  try {
    //datos enviados por el cliente
    const { email, password } = await req.body;

    //buscamos el usuario
    const user = await User.findOne({
      where: { email, status: 'active' },
    });

    //valida si el usuario exister
    if (!user) {
      return next(new AppError('user does not exist', 404));
    }

    //validar contraseñas
    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      return next(new AppError('credenciales invalid', 404));
    }

    //generar jswebtoken
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES,
    });

    //excluimos la contraseña
    user.password = undefined;

    //enviamos la respues positiva
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
  createUser,
  updateUser,
  searchUser,
  deleteUser,
  loginUser,
};
