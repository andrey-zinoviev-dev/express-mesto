const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  showUsers, showUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

const router = express.Router();
// const fs = require('fs');
// const path = require('path');
// const user = require('../models/user');

// const usersFilePath = path.join(__dirname, '../data/users.json');
router.get('/users', showUsers);
router.get('/users/:id', showUser);
// router.post('/users', addUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+=]+$/),
  }).unknown(true),
}), updateUserAvatar);
// router.post('/login', login);
module.exports = router;
