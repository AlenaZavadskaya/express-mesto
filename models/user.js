const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    // validate: {
    //   validator(v) {
    //     // eslint-disable-next-line no-useless-escape
    //     return /https?:\/\/[www\.]?[a-zA-Z0-9\-._~:/?#[\]@!$&'()\*+,;=]{1,}\.ru[\S*]?/g.test(v);
    //   },
    // },
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
