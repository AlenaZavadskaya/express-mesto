const express = require('express');

const app = express();
const path = require('path');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
