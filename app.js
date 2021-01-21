const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { userLoginValidation, userRegisterValidation } = require("./middlewares/serverDataValidator");

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

app.use("/signin", userLoginValidation, login);
app.use("/signup", userRegisterValidation, createUser);
app.use(auth);
app.use("/", usersRoutes);
app.use("/", cardsRoutes);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { status = 500, message } = err;

  res.status(status).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: status === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
