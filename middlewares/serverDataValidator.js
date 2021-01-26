const { Joi, celebrate } = require('celebrate');

const userRegisterValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().uri().custom((value, helper) => {
      // eslint-disable-next-line no-useless-escape
      const regExp = /https?\:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
      if (!value.match(regExp)) {
        return helper.message('Invalid value');
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().custom((value, helper) => {
      // eslint-disable-next-line no-useless-escape
      const regExp = /https?\:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
      if (!value.match(regExp)) {
        return helper.message('Invalid value');
      }
      return value;
    }),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userIdValidation,
  cardValidation,
  cardIdValidation,
};
