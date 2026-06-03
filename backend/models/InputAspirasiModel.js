const db = require("../config/database");

// simpan input dari siswa
exports.create = (data, callback) => {
  db.query("INSERT INTO Input_Aspirasi SET ?", data, callback);
};

// ambil semua data (JOIN semua tabel)
exports.getAll = (callback) => {
  db.query(`
    SELECT 
      ia.id_pelaporan,
      ia.nis,
      s.kelas,
      k.ket_kategori,
      ia.lokasi,
      ia.ket,
      ia.foto,
      a.id_aspirasi,
      a.status,
      a.feedback,
      ia.created_at
    FROM Input_Aspirasi ia
    JOIN Siswa s ON ia.nis = s.nis
    JOIN Kategori k ON ia.id_kategori = k.id_kategori
    JOIN Aspirasi a ON ia.id_aspirasi = a.id_aspirasi
    ORDER BY ia.id_pelaporan DESC
  `, callback);
};