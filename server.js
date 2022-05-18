const { app } = require('./app'); // importamos app
const { db } = require('./utils/dataBase'); // importamos utils

//Iimportamos los models
const { initModels } = require('./models/initModel');

//autenticion de credenciales de base de datos
db.authenticate()
  .then(() => console.log('database authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('database sync'))
  .catch((err) => console.log(err));

// establecemos las relaciones
initModels();

//girar el servidor
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`express app runngin on port: ${PORT}`);
});
