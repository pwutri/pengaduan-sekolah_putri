const bcrypt = require("bcrypt");
const db = require("./config/database");

const buatAdmin = async () => {
  const hash = await bcrypt.hash("admin123", 10);

  db.query(
    "INSERT INTO Admin (username, password) VALUES (?, ?)",
    ["admin", hash],
    (err) => {
      if (err) console.log(err);
      else console.log("Admin berhasil dibuat ✅");
      process.exit();
    }
  );
};

buatAdmin();