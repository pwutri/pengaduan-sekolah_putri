const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");

// ================= LOGIN =================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username=?",
    [username],
    async (err, result) => {

      if (err) {
        console.log("ERROR LOGIN:", err);
        return res.json({ message: "Error server" });
      }

      if (result.length === 0) {
        return res.json({ message: "User tidak ditemukan" });
      }

      const valid = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!valid) {
        return res.json({ message: "Password salah" });
      }

      res.json({ message: "Login berhasil 💖" });
    }
  );
});

module.exports = router;