const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        throw new BadRequestError("Ошибка валидации");
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else if (card.owner == req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            res.status(200).send({ data: card });
          })
          .catch((error) => {
            if (error.name === "CastError") {
              throw new NotFoundError("Карточка не найдена");
            } else {
              next(error);
            }
          });
      } else {
        throw new BadRequestError(
          "Вы не можете удалять карточки других пользователей"
        );
      }
    })
    .catch(next);
};
