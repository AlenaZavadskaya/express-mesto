const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const pathToFile = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  fsPromises
    .readFile(pathToFile, { encoding: 'utf8' })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
});

router.get('/users/:id', (req, res) => {
  fsPromises
    .readFile(pathToFile, { encoding: 'utf8' })
    .then((data) => {
      const { id } = req.params;
      const users = JSON.parse(data);
      const user = users.find((i) => i._id === id);
      if (user) {
        res.send(user);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch(() => {
      res.status(500).send({ message: 'Что-то пошло не так' });
    });
});

module.exports = router;
