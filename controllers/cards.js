const card = require('../models/card');
// const card = require('../models/card');
const Card = require('../models/card');

const showCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Карточки не найдены' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Введены неверные данные при создании элемента' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Неверный адрес карточки' });
    });
};

const likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findOneAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Карточка не найдена' });
    });
};

const dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findOneAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Карточка не найдена' });
    });
};
module.exports = {
  showCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
