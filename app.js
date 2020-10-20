const express = require('express');

// const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cardsRouter = require('./routes/cards');
const router = require('./routes/users');

const { login, addUser } = require('./controllers/users');
const { authentificate } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = [
  'http://dtm.students.nomoreparties.co',
  'http://www.dtm.students.nomoreparties.co',
  'http://localhost:3000',
];
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const errorHandler = (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
};

//  заменена настройка body-parser, была url-encoded
//  теперь json
//  в postman отправляется запрос в формате raw/json
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '5f63e4b8cb5b950e2cf76fb2',
//   };

//   next();
// });
app.use((req, res, next) => {
  const { origin } = req.header;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), addUser);

app.use(authentificate);

app.use('/', router);
app.use('/', cardsRouter);

app.use(errorHandler);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log('Listenning at the prot: ', PORT);
});
