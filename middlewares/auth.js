const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("token", req.headers);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
    // console.log("payload", payload);
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация1" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log("req.user", req.user);
  next(); // пропускаем запрос дальше
};
