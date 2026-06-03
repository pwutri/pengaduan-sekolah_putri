const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ message: "Token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, "SECRETKEY");
    req.user = decoded;
    next();
  } catch (err) {
    res.json({ message: "Token tidak valid" });
  }
};