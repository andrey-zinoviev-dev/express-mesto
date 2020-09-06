const express = require('express');

const path = require('path');
const router = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const errorHandler = (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
};
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use('/', cardsRouter);

app.use(errorHandler);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log('Listenning at the prot: ', PORT);
});
