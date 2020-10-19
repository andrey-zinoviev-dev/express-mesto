const express = require('express');
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
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
// router.post('/login', login);
module.exports = router;
