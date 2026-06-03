import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/aspirasi")
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.log(err));
  }, []);

  // SEARCH
  const filtered = data.filter(item =>
    (item.ket || "").toLowerCase().includes(search.toLowerCase())
  );

  // HITUNG DATA (TAMBAHAN MINIMAL)
  const total = data.length;
  const proses = data.filter(d => d.status === "Proses").length;
  const selesai = data.filter(d => d.status === "Selesai").length;
  const menunggu = data.filter(d => d.status === "Menunggu").length;

  return (
    <div>

      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Submission History</h1>
          <p style={subtitle}>
            Riwayat aspirasi yang pernah kamu kirim 💖
          </p>
        </div>

        <input
          placeholder="🔍 Search submissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
      </div>

      {/* CARD */}
      <div style={cardContainer}>

        <div style={card}>
          <div>
            <p style={cardTitle}>Total Aspirasi</p>
            <h1 style={{ ...cardNumber, color: "#b91c1c" }}>
              {total}
            </h1>
          </div>
          <div style={iconBoxRed}>📄</div>
        </div>

        <div style={card}>
          <div>
            <p style={cardTitle}>Menunggu</p>
            <h1 style={{ ...cardNumber, color: "#374151" }}>
              {menunggu}
            </h1>
          </div>
          <div style={iconBoxGray}>🕐</div>
        </div>

        <div style={card}>
          <div>
            <p style={cardTitle}>Diproses</p>
            <h1 style={{ ...cardNumber, color: "#2563eb" }}>
              {proses}
            </h1>
          </div>
          <div style={iconBoxBlue}>⏳</div>
        </div>

        <div style={card}>
          <div>
            <p style={cardTitle}>Selesai</p>
            <h1 style={{ ...cardNumber, color: "#10b981" }}>
              {selesai}
            </h1>
          </div>
          <div style={iconBoxBlue}>✅</div>
        </div>

      </div>

      {/* TABLE */}
      <div style={tableWrapper}>

        <div style={tableTop}>
          <div>
            <h2 style={{ margin: 0 }}>Recent Aspirations</h2>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button style={filterBtnActive}>All Time</button>
              <button style={filterBtn}>This Month</button>
            </div>
          </div>
        </div>

        <table width="100%" style={table}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={th}>NO</th>
              <th style={th}>ASPIRASI</th>
              <th style={th}>STATUS</th>
              <th style={th}>FEEDBACK</th>
              <th style={th}>FOTO</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} style={tr}>

                <td style={td}>{i + 1}</td>

                <td style={td}>
                  <div style={{ fontWeight: "600", fontSize: "15px" }}>
                    {item.judul || "Aspirasi"}
                  </div>

                  <div style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginTop: "5px",
                    maxWidth: "400px"
                  }}>
                    {item.ket}
                  </div>
                </td>

                <td style={td}>
                  <span style={statusBadge(item.status)}>
                    ● {item.status}
                  </span>
                </td>

                <td style={td}>
                  <div style={{
                    color: "#374151",
                    fontSize: "14px",
                    maxWidth: "250px"
                  }}>
                    {item.feedback || "-"}
                  </div>
                </td>

                <td style={td}>
                  {item.foto ? (
                    <img
                      src={`http://localhost:3000/uploads/${item.foto}`}
                      alt="foto"
                      style={imgStyle}
                    />
                  ) : (
                    <div style={{ color: "#9ca3af" }}>-</div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={empty}>
            Tidak ada data 😢
          </div>
        )}

      </div>

    </div>
  );
}

/* ================= STYLE (TIDAK DIUBAH) ================= */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  flexWrap: "wrap",
  gap: "15px"
};

const title = {
  margin: 0,
  fontSize: "35px",
  color: "#111827"
};

const subtitle = {
  color: "#6b7280",
  marginTop: "5px"
};

const searchInput = {
  padding: "14px 18px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  width: "280px",
  outline: "none",
  fontSize: "14px"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "25px",
  flexWrap: "wrap"
};

const card = {
  flex: "1",
  minWidth: "220px",
  background: "#ffffff",
  borderRadius: "20px",
  padding: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

const cardTitle = {
  color: "#6b7280",
  marginBottom: "10px",
  fontSize: "15px"
};

const cardNumber = {
  margin: 0,
  fontSize: "45px",
  fontWeight: "bold"
};

const iconBoxRed = {
  width: "65px",
  height: "65px",
  borderRadius: "18px",
  background: "#fee2e2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px"
};

const iconBoxGray = {
  width: "65px",
  height: "65px",
  borderRadius: "18px",
  background: "#f3f4f6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px"
};

const iconBoxBlue = {
  width: "65px",
  height: "65px",
  borderRadius: "18px",
  background: "#dbeafe",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px"
};

const tableWrapper = {
  background: "#ffffff",
  borderRadius: "25px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

const tableTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "25px",
  borderBottom: "1px solid #f3f4f6",
  flexWrap: "wrap",
  gap: "15px"
};

const filterBtnActive = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "20px",
  background: "#fee2e2",
  color: "#b91c1c",
  cursor: "pointer"
};

const filterBtn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "20px",
  background: "#f3f4f6",
  color: "#374151",
  cursor: "pointer"
};

const filterButton = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "#f3f4f6",
  cursor: "pointer",
  fontWeight: "600"
};

const table = {
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "18px 25px",
  color: "#6b7280",
  fontSize: "14px"
};

const td = {
  padding: "22px 25px",
  borderBottom: "1px solid #f3f4f6",
  verticalAlign: "top"
};

const tr = {
  transition: "0.3s"
};

const imgStyle = {
  width: "75px",
  height: "75px",
  objectFit: "cover",
  borderRadius: "12px",
  border: "2px solid #f3f4f6"
};

const empty = {
  padding: "30px",
  textAlign: "center",
  color: "#6b7280"
};

const statusBadge = (status) => ({
  padding: "8px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
  background:
    status === "Selesai"
      ? "#ecfdf5"
      : status === "Proses"
      ? "#eff6ff"
      : status === "Menunggu"
      ? "#f3f4f6"
      : "#fef2f2",

  color:
    status === "Selesai"
      ? "#047857"
      : status === "Proses"
      ? "#2563eb"
      : status === "Menunggu"
      ? "#374151"
      : "#dc2626"
});