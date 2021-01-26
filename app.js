const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const {
  userLoginValidation,
  userRegisterValidation,
} = require('./middlewares/serverDataValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const allowedCors = [
  'https://alenazavadskaya.students.nomoredomains.monster',
  'http://alenazavadskaya.students.nomoredomains.monster',
  'https://www.alenazavadskaya.students.nomoredomains.monster',
  'http://www.alenazavadskaya.students.nomoredomains.monster',
  'http://localhost:3000',
];

app.use(cors());

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.options('*', cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', userLoginValidation, login);
app.use('/signup', userRegisterValidation, createUser);
app.use(auth);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // централизованный обработчик ошибок
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
