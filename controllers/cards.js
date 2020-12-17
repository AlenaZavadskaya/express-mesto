const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации: ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
