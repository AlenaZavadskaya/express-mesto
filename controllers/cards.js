const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: `Ошибка валидации: ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found.' });
        // throw new NotFoundError('Card not found')
      } else if (card.owner == req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            if (!card) {
              res.status(404).send({ message: 'Card not found!' });
            } else {
              res.send({ data: card });
            }
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              res.status(404).send({ message: 'Card not found!!' });
            } else {
              res.status(500).send({ message: 'Произошла ошибка' });
            }
          });
      } else {
        res.status(404).send({ message: 'You cant delete this card.' });
      }
    })
    .catch(next)
};
