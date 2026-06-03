const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Kategori", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

module.exports = router;