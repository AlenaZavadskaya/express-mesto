const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  // fsPromises
  //   .readFile(pathToFile, { encoding: 'utf8' })
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
});

router.get('/users/:id', (req, res) => {
//   fsPromises
//     .readFile(pathToFile, { encoding: 'utf8' })
//     .then((data) => {
//       const { id } = req.params;
//       const users = JSON.parse(data);
//       const user = users.find((i) => i._id === id);
//       if (user) {
//         res.send(user);
//         return;
//       }
//       res.status(404).send({ message: 'Нет пользователя с таким id' });
//     })
//     .catch(() => {
//       res.status(500).send({ message: 'Что-то пошло не так' });
//     });
// });
//   const { id } = req.params;
//   User.findOne({ id })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({ message: 'Нет пользователя с таким id' });
//       }
//       return res.ststus(200).send(user);
//     })
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// });
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.ststus(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

// User.findById(req.params.id)

//   .then((data) => {
//     const { id } = req.params;
//     const users = JSON.parse(data);
//     const user = users.find((i) => i._id === id);
//     if (user) {
//       res.send(user);
//       return;
//     }
//     res.status(404).send({ message: 'Нет пользователя с таким id' });
//   })
//   .catch(() => {
//     res.status(500).send({ message: 'Что-то пошло не так' });
//   });
// });

router.post('/', (req, res) => {
  // eslint-disable-next-line max-len
  const { name, about, avatar } = req.body; // получим из объекта запроса имя и описание пользователя

  User.create({ name, about, avatar }) // создадим документ на основе пришедших данных
  // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
  // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
