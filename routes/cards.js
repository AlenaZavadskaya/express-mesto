const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const {
  cardValidation,
  cardIdValidation,
} = require('../middlewares/serverDataValidator');

router.get('/cards', getCards);
router.post('/cards', cardValidation, createCard);
router.delete('/cards/:cardId', cardIdValidation, deleteCard);

module.exports = router;
