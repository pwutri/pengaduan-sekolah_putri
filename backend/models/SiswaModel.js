const db = require("../config/database");

// cek siswa berdasarkan NIS
exports.findByNIS = (nis, callback) => {
  db.query("SELECT * FROM Siswa WHERE nis = ?", [nis], callback);
};

// tambah siswa baru
exports.create = (nis, kelas, callback) => {
  db.query(
    "INSERT INTO Siswa (nis, kelas) VALUES (?, ?)",
    [nis, kelas],
    callback
  );
};