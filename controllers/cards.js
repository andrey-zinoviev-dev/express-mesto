// const card = require('../models/card');
const Card = require('../models/card');

const showCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Карточки не найдены' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findById(cardId)
  .populate('owner')
  .then((data) => {
    const ownerId = data.owner._id.toString();
    if(ownerId === _id) {
      return Card.findByIdAndDelete(cardId)
      .then((card) => {
        res.status(200).send(card);
      })
      .catch(() => {
        res.status(404).send({ message: 'Карточка не найдена' });
      })
    }
    return res.status(400).send({ message: 'У Вас нет прав для удаления' });
  })
  .catch(() => {
    res.status(404).send({ message: 'Карточка не найдена' });
  })
};

const likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Карточка не найдена' });
    });
};

const dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
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
