const { db } = require('../utils/dataBase'); // importamos la base de datos
const { DataTypes } = require('sequelize'); //DataTypes(esto para que este valor puede ser leido en cualquier base de datos )

const Restaurants = db.define('restaurants', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { Restaurants };
