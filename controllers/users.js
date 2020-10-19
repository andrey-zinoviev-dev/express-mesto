const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const showUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
//  пользователь показывается по :id
const showUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
    });
};
const addUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });

  })
  
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  
  if(req.body._id) {
    return res.status(400).send({ message: "Нет прав для этой операции" });
  }
  
  return User.findByIdAndUpdate(_id, req.body, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные ' });
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if(req.body._id) {
    return res.status(400).send({ message: "Нет прав для этой операции" });
  }
 
  return User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(401).send({ message: "Проверьте почту или пароль"});
  }

  return User.findOne({ email }).select('+password')
  .then((user) => {
    if(!user) {
      return Promise.reject(new Error('Пользвоатель не найден'));
    }
    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if(!matched) {
        return Promise.reject(new Error('Проверьте почту или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, 'secret-key');
      res.status(200).send({ payload: token });
    })
  })
  .catch(() => {
    res.status(404).send({ message: 'Пользователь не найден' });
  })
};

module.exports = {
  showUsers,
  showUser,
  addUser,
  updateUser,
  updateUserAvatar,
  login,
};
