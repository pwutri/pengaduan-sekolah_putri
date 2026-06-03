const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔥 ================= REGISTER ADMIN (LAMA - JANGAN DIUBAH) =================
exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO Admin (username, password) VALUES (?, ?)",
    [username, hash],
    (err) => {
      if (err) {
        console.log("REGISTER ERROR:", err);
        return res.json({ message: "Gagal buat admin" });
      }

      res.json({ message: "Admin berhasil dibuat ✅" });
    }
  );
};

// 🔐 ================= LOGIN ADMIN =================
exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("LOGIN INPUT:", username, password);

  db.query(
    "SELECT * FROM Admin WHERE username = ?",
    [username],
    async (err, result) => {

      if (err) {
        console.log("DB ERROR:", err);
        return res.json({ message: "Error database" });
      }

      console.log("HASIL DB:", result);

      if (result.length === 0) {
        return res.json({ message: "User tidak ditemukan" });
      }

      const admin = result[0];

      console.log("PASSWORD DB:", admin.password);

      const match = await bcrypt.compare(password, admin.password);

      console.log("MATCH:", match);

      if (!match) {
        return res.json({ message: "Password salah" });
      }

      const token = jwt.sign(
        { username: admin.username },
        "SECRETKEY"
      );

      res.json({ token });
    }
  );
};

// 🔥 ================= USER MANAGEMENT =================

// 🔥 GET SEMUA USER (buat dashboard)
exports.getAll = (req, res) => {
  db.query("SELECT * FROM Admin", (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ message: "Gagal ambil data" });
    }

    res.json(result);
  });
};

// 🔥 TAMBAH USER DARI DASHBOARD
exports.create = async (req, res) => {
  const { nama, username, password, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO Admin (nama, username, password, role) VALUES (?, ?, ?, ?)",
      [nama, username, hash, role],
      (err) => {
        if (err) {
          console.log(err);
          return res.json({ message: "Gagal tambah user" });
        }

        res.json({ message: "User berhasil ditambahkan ✅" });
      }
    );
  } catch (err) {
    res.json({ message: "Error server" });
  }
};