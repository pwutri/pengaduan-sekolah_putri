const db = require("../config/database");

// ambil semua kategori (buat dropdown nanti kalau mau auto)
exports.getAll = (callback) => {
  db.query("SELECT * FROM Kategori", callback);
};