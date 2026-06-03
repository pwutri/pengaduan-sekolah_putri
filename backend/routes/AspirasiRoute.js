const express = require("express");
const router = express.Router();
const db = require("../config/database");
const multer = require("multer");

// upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* ===========================
   CREATE (INPUT ASPIRASI)
=========================== */
router.post("/", upload.single("foto"), (req, res) => {
  // ✅ TAMBAH kelas di sini
  const { nis, kelas, kategori_id, lokasi, ket } = req.body;
  const foto = req.file ? req.file.filename : null;

  db.query(
    // ✅ TAMBAH kelas di query
    "INSERT INTO input_aspirasi (nis, kelas, kategori_id, lokasi, ket, foto, status, feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    
    // ✅ TAMBAH kelas di values
    [nis, kelas, kategori_id, lokasi, ket, foto, "Menunggu", "-"],
    
    (err) => {
      if (err) {
        console.log("ERROR INSERT:", err);
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Berhasil kirim 💖" });
    }
  );
});

/* ===========================
   GET (AMBIL DATA)
=========================== */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM input_aspirasi ORDER BY id_aspirasi DESC",
    (err, result) => {
      if (err) {
        console.log("ERROR GET:", err);
        return res.status(500).json({ error: err });
      }
      res.json(result);
    }
  );
});

/* ===========================
   UPDATE (STATUS & FEEDBACK)
=========================== */
router.put("/:id", (req, res) => {
  const { status, feedback } = req.body;

  db.query(
    "UPDATE input_aspirasi SET status=?, feedback=? WHERE id_aspirasi=?",
    [status, feedback, req.params.id],
    (err) => {
      if (err) {
        console.log("ERROR UPDATE:", err);
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Update berhasil 💖" });
    }
  );
});

module.exports = router;