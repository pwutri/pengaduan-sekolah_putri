const db = require("../config/database");

// GET ALL (dashboard)
exports.getAll = (req, res) => {
  db.query(`
    SELECT ia.*, a.status, a.feedback
    FROM Input_Aspirasi ia
    LEFT JOIN Aspirasi a ON ia.id_aspirasi = a.id_aspirasi
    ORDER BY ia.id_pelaporan DESC
  `, (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
};

// CREATE
exports.create = (req, res) => {
  // ✅ TAMBAH kelas di sini
  const { nis, kelas, id_kategori, lokasi, ket } = req.body;
  const foto = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO Aspirasi (status, feedback) VALUES (?, ?)",
    ["Menunggu", "-"],
    (err, resultAspirasi) => {
      if (err) return res.json(err);

      const id_aspirasi = resultAspirasi.insertId;

      db.query(
        // ✅ TAMBAH kelas di query
        "INSERT INTO Input_Aspirasi (nis, kelas, id_kategori, lokasi, ket, id_aspirasi, foto) VALUES (?, ?, ?, ?, ?, ?, ?)",
        // ✅ TAMBAH kelas di values
        [nis, kelas, id_kategori, lokasi, ket, id_aspirasi, foto],
        (err) => {
          if (err) return res.json(err);
          res.json({ message: "Berhasil" });
        }
      );
    }
  );
};

// UPDATE
exports.update = (req, res) => {
  const { id } = req.params;
  const { status, feedback } = req.body;

  db.query(
    "UPDATE Aspirasi SET status=?, feedback=? WHERE id_aspirasi=?",
    [status, feedback, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Update berhasil" });
    }
  );
};