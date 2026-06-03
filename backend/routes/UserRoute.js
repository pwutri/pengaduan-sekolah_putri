const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");


// 🔥 GET USER (SUDAH TAMBAH FIELD BARU)
router.get("/", (req, res) => {
  db.query(
    "SELECT id, nama, no_telp, kelas, username, password, role, created_at FROM user",
    (err, result) => {
      if (err) return res.json([]);
      res.json(result);
    }
  );
});


// 🔥 CREATE USER
router.post("/", async (req, res) => {
  const { nama, no_telp, kelas, username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO user (nama, no_telp, kelas, username, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [nama, no_telp, kelas, username, hash, "user"],
      (err) => {
        if (err) {
          console.log(err);
          return res.json({ error: err });
        }
        res.json({ message: "User berhasil ditambah 💖" });
      }
    );
  } catch (err) {
    console.log(err);
    res.json({ message: "Error server" });
  }
});


// 🔥 UPDATE USER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, no_telp, kelas, username, password } = req.body;

  try {
    // kalau password diisi → hash ulang
    if (password && password !== "") {
      const hash = await bcrypt.hash(password, 10);

      db.query(
        "UPDATE user SET nama=?, no_telp=?, kelas=?, username=?, password=? WHERE id=?",
        [nama, no_telp, kelas, username, hash, id],
        (err) => {
          if (err) return res.json({ error: err });
          res.json({ message: "User berhasil diupdate 💖" });
        }
      );
    } else {
      // kalau password kosong → jangan diubah
      db.query(
        "UPDATE user SET nama=?, no_telp=?, kelas=?, username=? WHERE id=?",
        [nama, no_telp, kelas, username, id],
        (err) => {
          if (err) return res.json({ error: err });
          res.json({ message: "User berhasil diupdate 💖" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Error server" });
  }
});


// 🔥 DELETE USER
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM user WHERE id=?", [id], (err) => {
    if (err) return res.json({ error: err });
    res.json({ message: "User berhasil dihapus 💖" });
  });
});


// 🔥 LOGIN USER
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE username=?",
    [username],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ message: "Error server" });
      }

      if (result.length === 0) {
        return res.json({ message: "User tidak ditemukan" });
      }

      const user = result[0];

      const cocok = await bcrypt.compare(password, user.password);

      if (!cocok) {
        return res.json({ message: "Password salah" });
      }

      res.json({
        message: "Login berhasil",
        user: {
          id: user.id,
          nama: user.nama,
          username: user.username,
          role: user.role
        }
      });
    }
  );
});


module.exports = router;