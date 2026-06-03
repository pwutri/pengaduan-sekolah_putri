import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const load = () => {
    axios
      .get("http://localhost:3000/api/aspirasi")
      .then((res) => setData(Array.isArray(res.data) ? res.data : []));
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id, status, feedback) => {
    axios
      .put(`http://localhost:3000/api/aspirasi/${id}`, {
        status,
        feedback,
      })
      .then(load);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filtered = data.filter((d) =>
    (d.ket || "").toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 HITUNG DATA
  const total = data.length;
  const menunggu = data.filter((d) => d.status === "Menunggu").length;
  const proses = data.filter((d) => d.status === "Proses").length;
  const selesai = data.filter((d) => d.status === "Selesai").length;

  return (
    <div style={wrapper}>
      {/* SIDEBAR */}
      <div style={sidebar}>
        <div>
          {/* LOGO */}
          <div style={{ marginBottom: "40px" }}>
            <div style={logoBox}>❤️</div>

            <h2 style={{ margin: "15px 0 5px 0" }}>
              Aspirasi Siswa
            </h2>

            <p style={sidebarText}>
              Admin Dashboard
            </p>
          </div>

          {/* MENU */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            
            <Link to="/dashboard" style={activeMenu}>
              <span>🏠 Dashboard</span>
            </Link>

            <Link to="/user" style={menu}>
              <span>👤 User</span>
            </Link>

            <div style={menu}>
              <span>📊 Total Aspirasi</span>
              <span style={badge}>{total}</span>
            </div>

            <div style={menu}>
              <span>📥 Menunggu</span>
              <span style={badge}>{menunggu}</span>
            </div>

            <div style={menu}>
              <span>⏳ Diproses</span>
              <span style={badge}>{proses}</span>
            </div>

            <div style={menu}>
              <span>✅ Selesai</span>
              <span style={badge}>{selesai}</span>
            </div>

          </div>
        </div>

        {/* LOGOUT */}
        <div onClick={logout} style={logoutBtn}>
          🚪 Logout
        </div>
      </div>

      {/* CONTENT */}
      <div style={content}>

        {/* TOPBAR */}
        <div style={topbar}>
          <input
            placeholder="🔍 Cari aspirasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <div style={adminBox}>
            <div>
              <h4 style={{ margin: 0 }}>
                {role === "admin" ? "Admin" : "User"}
              </h4>

              <p style={adminText}>
                Administrator
              </p>
            </div>

            <div style={avatar}>
              A
            </div>
          </div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <div>
            <h1 style={{ margin: 0 }}>
              Selamat datang, Admin 👋
            </h1>

            <p style={heroText}>
              Kelola aspirasi siswa dengan cepat dan mudah.
            </p>
          </div>

          <div style={dateBox}>
            📅 {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* CARD */}
        <div style={cardContainer}>

          <Card
            title="TOTAL ASPIRASI"
            value={total}
            subtitle="Semua data aspirasi"
            color="#ec4899"
          />

          <Card
            title="MENUNGGU"
            value={menunggu}
            subtitle="Belum diproses"
            color="#f59e0b"
          />

          <Card
            title="DIPROSES"
            value={proses}
            subtitle="Sedang diproses"
            color="#3b82f6"
          />

          <Card
            title="SELESAI"
            value={selesai}
            subtitle="Sudah selesai"
            color="#22c55e"
          />

        </div>

        {/* TABLE */}
        <div style={tableBox}>

          <div style={tableHeader}>
            <h2 style={{ margin: 0 }}>
              Data Aspirasi
            </h2>
          </div>

          <table width="100%" style={table}>
            <thead>
              <tr style={{ background: "#fef2f2" }}>
                <th style={th}>NO</th>
                <th style={th}>NIS</th>
                <th style={th}>KELAS</th>
                <th style={th}>ASPIRASI</th>
                <th style={th}>STATUS</th>
                <th style={th}>FOTO</th>
                <th style={th}>FEEDBACK</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id_aspirasi} style={tr}>

                  <td style={td}>{i + 1}</td>

                  <td style={td}>
                    {item.nis}
                  </td>

                  <td style={td}>
                    {item.kelas || "-"}
                  </td>

                  <td style={tdText}>
                    {item.ket}
                  </td>

                  <td style={td}>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        update(
                          item.id_aspirasi,
                          e.target.value,
                          item.feedback
                        )
                      }
                      style={selectStyle}
                    >
                      <option>Menunggu</option>
                      <option>Proses</option>
                      <option>Selesai</option>
                    </select>
                  </td>

                  <td style={td}>
                    {item.foto ? (
                      <img
                        src={`http://localhost:3000/uploads/${item.foto}`}
                        alt="foto"
                        style={imgStyle}
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td style={td}>
                    <input
                      defaultValue={item.feedback}
                      onBlur={(e) =>
                        update(
                          item.id_aspirasi,
                          item.status,
                          e.target.value
                        )
                      }
                      style={inputStyle}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p style={{ marginTop: "20px" }}>
              Tidak ada data
            </p>
          )}

        </div>

        {/* RINGKASAN */}
        <div style={summaryContainer}>

          {/* STATUS */}
          <div style={summaryBox}>
            <h3 style={summaryTitle}>
              Ringkasan Status
            </h3>

            <div style={summaryItem}>
              <span>📊 Total Aspirasi</span>
              <b>{total}</b>
            </div>

            <div style={summaryItem}>
              <span>📥 Menunggu</span>
              <b>{menunggu}</b>
            </div>

            <div style={summaryItem}>
              <span>⏳ Diproses</span>
              <b>{proses}</b>
            </div>

            <div style={summaryItem}>
              <span>✅ Selesai</span>
              <b>{selesai}</b>
            </div>
          </div>

          {/* KATEGORI */}
          <div style={summaryBox}>
            <h3 style={summaryTitle}>
              Ringkasan Kategori
            </h3>

            <div style={summaryItem}>
              <span>🏫 Fasilitas</span>
              <b>
                {data.filter((d) => d.kategori_id == 1).length}
              </b>
            </div>

            <div style={summaryItem}>
              <span>🧹 Kebersihan</span>
              <b>
                {data.filter((d) => d.kategori_id == 2).length}
              </b>
            </div>

            <div style={summaryItem}>
              <span>🔒 Keamanan</span>
              <b>
                {data.filter((d) => d.kategori_id == 3).length}
              </b>
            </div>

            <div style={summaryItem}>
              <span>📚 Sarana Kelas</span>
              <b>
                {data.filter((d) => d.kategori_id == 4).length}
              </b>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* ================= CARD ================= */

function Card({ title, value, subtitle, color }) {
  return (
    <div style={card}>
      <div
        style={{
          ...iconBox,
          background: `${color}20`,
          color,
        }}
      >
        ●
      </div>

      <div>
        <p style={cardTitle}>
          {title}
        </p>

        <h1 style={{ margin: "5px 0", color }}>
          {value}
        </h1>

        <p style={cardSubtitle}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  background: "#f3f4f6",
};

const sidebar = {
  width: "260px",
  background: "linear-gradient(180deg, #dc2626, #b91c1c)",
  color: "white",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logoBox = {
  width: "55px",
  height: "55px",
  borderRadius: "15px",
  background: "white",
  color: "#dc2626",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};

const sidebarText = {
  color: "#fecaca",
  fontSize: "14px",
};

const menu = {
  color: "white",
  textDecoration: "none",
  padding: "14px 16px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const activeMenu = {
  ...menu,
  background: "rgba(255,255,255,0.2)",
  fontWeight: "bold",
};

const badge = {
  background: "#f87171",
  padding: "3px 8px",
  borderRadius: "20px",
  fontSize: "12px",
};

const logoutBtn = {
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.1)",
  cursor: "pointer",
  textAlign: "center",
};

const content = {
  flex: 1,
  padding: "30px",
};

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};

const searchInput = {
  width: "420px",
  padding: "14px 18px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  background: "white",
  outline: "none",
};

const adminBox = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  background: "white",
  padding: "10px 15px",
  borderRadius: "15px",
};

const adminText = {
  margin: 0,
  color: "#6b7280",
  fontSize: "13px",
};

const avatar = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#fee2e2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "#dc2626",
};

const hero = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};

const heroText = {
  color: "#6b7280",
  marginTop: "10px",
};

const dateBox = {
  background: "white",
  padding: "14px 18px",
  borderRadius: "14px",
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "25px",
};

const card = {
  background: "white",
  borderRadius: "22px",
  padding: "25px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const iconBox = {
  width: "60px",
  height: "60px",
  borderRadius: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: "bold",
};

const cardTitle = {
  margin: 0,
  fontSize: "13px",
  color: "#6b7280",
};

const cardSubtitle = {
  margin: 0,
  color: "#9ca3af",
  fontSize: "13px",
};

const tableBox = {
  background: "white",
  borderRadius: "25px",
  padding: "25px",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const table = {
  borderCollapse: "collapse",
};

const th = {
  padding: "16px",
  color: "#6b7280",
  fontSize: "14px",
  textAlign: "center",
};

const td = {
  padding: "16px",
  borderBottom: "1px solid #f3f4f6",
  textAlign: "center",
};

const tdText = {
  padding: "16px",
  borderBottom: "1px solid #f3f4f6",
};

const tr = {
  transition: "0.2s",
};

const selectStyle = {
  padding: "8px 10px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
};

const imgStyle = {
  width: "70px",
  height: "70px",
  objectFit: "cover",
  borderRadius: "12px",
};

const summaryContainer = {
  marginTop: "25px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const summaryBox = {
  background: "white",
  padding: "25px",
  borderRadius: "22px",
};

const summaryTitle = {
  marginTop: 0,
  marginBottom: "20px",
};

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  color: "#374151",
};