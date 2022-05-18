const Sequelize = require('sequelize'); // importamos la libreria sequelize que es un ORM
const dotenv = require('dotenv'); // import la libereria dotenv para crear variables de entorno

dotenv.config({ path: './config.env' }); //buscamos el carchivo .env con un solo punto. ya que para dotenv asi se busca

//creamos la conexion con la base datos
const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: false,
});

module.exports = { db };
