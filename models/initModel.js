const { Restaurants } = require('./restaurants.models');
const { Reviews } = require('./reviews.models');
const { Meals } = require('./meals.models');
const { User } = require('./users.models');
const { Orders } = require('./order.models');

const initModels = () => {
  // User.hasMany(Post, { foreignKey: 'userId' });
  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);

  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);

  // Restaurants.hasMany(Orders);
  // Orders.belongsTo(Restaurants);

  User.hasMany(Orders);
  Orders.belongsTo(User);

  Meals.hasOne(Orders);
  Orders.belongsTo(Meals);
};
module.exports = { initModels };
