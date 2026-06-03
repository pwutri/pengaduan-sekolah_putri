const express = require("express");
const cors = require("cors");

require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

// akses folder uploads (foto)
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/aspirasi", require("./routes/AspirasiRoute"));
app.use("/api/admin", require("./routes/AdminRoute"));
app.use("/api/user", require("./routes/UserRoute"));

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});