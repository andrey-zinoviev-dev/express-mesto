const express = require('express');

// const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { nextTick } = require('process');
const cardsRouter = require('./routes/cards');
const router = require('./routes/users');

const { login, addUser } = require('./controllers/users');
const { authentificate } = require('./middlewares/auth');
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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://dtm.students.nomoreparties.co');
  next();
});
app.post('/signin', login);
app.post('/signup', addUser);

app.use(authentificate);

app.use('/', router);
app.use('/', cardsRouter);

app.use(errorHandler);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log('Listenning at the prot: ', PORT);
});
