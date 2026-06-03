const db = require("../config/database");

// buat aspirasi baru (status default = Menunggu)
exports.create = (callback) => {
  db.query("INSERT INTO Aspirasi () VALUES ()", callback);
};

// update status & feedback
exports.update = (id, status, feedback, callback) => {
  db.query(
    "UPDATE Aspirasi SET status=?, feedback=? WHERE id_aspirasi=?",
    [status, feedback, id],
    callback
  );
};