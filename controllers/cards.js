const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.createCard = (req, res) => {
  // console.log('Data in currentUser', req.body);
  // return null;
  // const owner = req.user._id;
  // console.log(`id:${req.user._id}`);
  // Card.create({ owner, ...req.body }) // создадим документ на основе пришедших данных
  // const { name, link } = req.body;
  // console.log('Data in currentUser', req.body);
  // Card.create({ name, link })

  const owner = req.body._id;
  console.log({ owner, ...req.body });
  return Card.create({ owner, ...req.body })
  // вернём записанные в базу данные
    .then((card) => res.status(200).send({ data: card }))
  // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// module.exports.deleteCard = (req, res) => {
//   Card.findByIdAndRemove(req.params.id)
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// };
