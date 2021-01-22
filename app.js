const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const cors = require('cors');

const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { userLoginValidation, userRegisterValidation } = require("./middlewares/serverDataValidator");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Массив разешённых доменов
const allowedCors = [
  'https://AlenaZavadskaya.students.nomoredomains.monster',
  'https://www.AlenaZavadskaya.students.nomoredomains.monster',
  'localhost:3000'
];

app.use(cors());

app.use(function(req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(requestLogger);

app.use("/signin", userLoginValidation, login);
app.use("/signup", userRegisterValidation, createUser);
app.use(auth);
app.use("/", usersRoutes);
app.use("/", cardsRoutes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use((err, req, res, next) => { // централизованный обработчик ошибок
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
