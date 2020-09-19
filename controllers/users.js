const User = require('../models/user');

const showUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Неполадки с сервером' });
    });
};
const showUser = (req, res) => {
  const { userId } = req.params.userId;
  User.find({ userId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};
const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Ошибка при создании пользователя' });
    });
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  // name: 'Gideon'- пример данных для изменения пользователя
  User.findOneAndUpdate(_id, { name: 'Gideon' }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: 'Пользователь не найден' });
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { link } = req.body;
  User.findOneAndUpdate(_id, { avatar: link }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Неверные данные пользователя или ссылка на аватар' });
    });
};

module.exports = {
  showUsers,
  showUser,
  addUser,
  updateUser,
  updateUserAvatar,
};
