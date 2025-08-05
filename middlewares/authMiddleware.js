const { expressjwt: checkJwt } = require("express-jwt");

function authMiddleware(req, res, next) {
  const middleware = checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });

  middleware(req, res, function (err) {
    if (err) return res.status(401).json({ error: "Token inválido" });
    next();
  });
}

module.exports = authMiddleware;
