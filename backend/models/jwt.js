const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  return jwt.sign(id, "this_is_my_secret_algol", { expiresIn: "500h" });
}

/// authenticate token -> generated before
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "this_is_my_secret_algol", (err, token) => {
    if (err) return res.status(404).json({ message: "User Not Found" });
    req.token = token;
    next();
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
