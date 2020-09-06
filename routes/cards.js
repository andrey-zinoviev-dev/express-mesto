const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

const cardsFilePath = path.join(__dirname, '../data/cards.json');
router.get('/cards', (req, res) => {
  fs.readFile(cardsFilePath, { encoding: 'utf8' }, (err, data) => {
    if (!data) {
      res.status(500).json({ message: 'Запрашиваемый файл не найден' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

module.exports = router;
