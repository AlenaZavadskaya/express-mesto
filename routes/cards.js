const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const pathToFile = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  fsPromises
    .readFile(pathToFile, { encoding: 'utf8' })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
});

module.exports = router;
