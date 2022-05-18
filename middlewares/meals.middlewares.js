const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');
const { AppError } = require('../utils/appError');

const mealsExist = async (req, res, next) => {
  try {
    //id del meals
    const { id } = req.params;

    //buscamos meals
    const searchMeals = await Meals.findOne({
      where: { id, status: 'active' },
      include: [{ model: Restaurants }],
    });

    //validamos existencia del meals
    if (!searchMeals) {
      return next(new AppError('meals does not exist', 404));
    }

    //envismos los datos por req
    req.mealsId = searchMeals;

    next();
  } catch (error) {
    next();
  }
};

module.exports = { mealsExist };
