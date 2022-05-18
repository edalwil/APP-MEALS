const express = require('express'); // importamos express
const rateLimit = require('express-rate-limit'); //importamos express-rate-limit para limitar las peticiones en la api
const cors = require('cors'); // importamos cors que la libreria que permite que el explorador pueda hacer peticiones a la api

//iniciamos express con app.
const app = express();

//importamos controller
const { errorGlobal } = require('./controllers/error.controllers');

//Routes
const { userRouter } = require('./router/users.routes');
const { mealsRouter } = require('./router/meals.routes');
const { ordersRouter } = require('./router/orders.routes');
const { restaurantsRouter } = require('./router/restaurants.routes');
const { reviewsRouter } = require('./router/reviews.routes');

//habilitamos datos JSON entrantes
app.use(express.json());

//hablitamos cors para entren las peticiones del navegador
app.use(cors());

//limitamos las respuestas de la api
const limiter = rateLimit({
  max: 100,
  windwMs: 1 * 60 * 60 * 1000,
  massage: 'too many requests front this IP',
});

app.use(limiter); //escuchando la variable limiter

//EndPoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/restaurants', reviewsRouter);

//errores
app.use('*', errorGlobal);

module.exports = { app };
