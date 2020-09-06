const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
router.get('/users', (req, res) => {
  fs.readFile(usersFilePath, { encoding: 'utf8' }, (err, data) => {
    if (!data) {
      res.status(500).json({ message: 'Запрашиваемый файл не найден' });
      return;
    }
    res.status(200);
    res.send(JSON.parse(data));
  });
});
router.get('/users/:id', (req, res) => {
  fs.readFile(usersFilePath, { encoding: 'utf8' }, (err, data) => {
    if (!data) {
      res.status(500).json({ message: 'Запрашиваемый файл не найден' });
      return;
    }
    res.status(200);
    const usersList = JSON.parse(data);
    const user = usersList.find((element) => element._id === req.params.id);
    if (!user) {
      res.status(404);
      res.send({ error: 'Нет пользователя с таким id' });
    }
    res.send(user);
  });
});
module.exports = router;
