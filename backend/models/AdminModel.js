const db = require("../config/database");

exports.findByUsername = (username, callback) => {
  db.query("SELECT * FROM Admin WHERE username = ?", [username], callback);
};