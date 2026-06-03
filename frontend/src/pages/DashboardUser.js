import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputAspirasi from "./InputAspirasi";
import History from "./History";

export default function DashboardUser() {
  const [menu, setMenu] = useState("dashboard");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const nama = localStorage.getItem("nama");
  const kelas = localStorage.getItem("kelas");

  const load = () => {
    axios
      .get("http://localhost:3000/api/aspirasi")
      .then((res) => {
        const hasil = Array.isArray(res.data) ? res.data : [];
        setData(hasil);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ FIX STATUS
  const total = data.length;

  const selesai = data.filter(
    (d) =>
      d.status &&
      d.status.toLowerCase().trim() === "selesai"
  ).length;

  // ✅ FIX DIPROSES
  const diproses = data.filter(
    (d) =>
      d.status &&
      (
        d.status.toLowerCase().trim() === "diproses" ||
        d.status.toLowerCase().trim() === "proses"
      )
  ).length;

  const menunggu = data.filter(
    (d) =>
      !d.status ||
      d.status.toLowerCase().trim() === "menunggu"
  ).length;

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <div>
          <div style={{ marginBottom: "45px" }}>
            <div style={logoBox}>❤️</div>

            <h2 style={{ margin: "15px 0 5px 0" }}>
              Aspirasi Siswa
            </h2>

            <p style={sidebarText}>
              Dashboard Siswa
            </p>
          </div>

          {/* MENU */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <MenuItem
              text="🏠 Dashboard"
              active={menu === "dashboard"}
              onClick={() => setMenu("dashboard")}
            />

            <MenuItem
              text="📝 Input Aspirasi"
              active={menu === "input"}
              onClick={() => setMenu("input")}
            />

            <MenuItem
              text="📜 History"
              active={menu === "history"}
              onClick={() => setMenu("history")}
            />

            <div style={menuBox}>
              📩 Total Aspirasi
              <span style={badge}>{total}</span>
            </div>

            <div style={menuBox}>
              🕐 Menunggu
              <span style={badge}>{menunggu}</span>
            </div>

            <div style={menuBox}>
              ⏳ Diproses
              <span style={badge}>{diproses}</span>
            </div>

            <div style={menuBox}>
              ✅ Selesai
              <span style={badge}>{selesai}</span>
            </div>

          </div>
        </div>

        {/* USER */}
        <div>
          <div style={profileBox}>
            <div style={avatar}>
              {nama ? nama.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <h4 style={{ margin: 0, color: "white", fontSize: "15px" }}>
                {nama || "User"}
              </h4>

              <p style={{ margin: 0, fontSize: "12px", color: "#fecaca" }}>
                {kelas || "-"}
              </p>
            </div>
          </div>

          <button onClick={logout} style={logoutBtn}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={content}>

        {/* TOPBAR */}
        <div style={topbar}>
          <div>
            <h1 style={{ margin: 0, color: "#991b1b", fontSize: "32px" }}>
              {menu === "dashboard" && "Dashboard"}
              {menu === "input" && "Input Aspirasi"}
              {menu === "history" && "History Aspirasi"}
            </h1>

            <p style={{ marginTop: "8px", color: "#6b7280" }}>
              Selamat datang, {nama || "Siswa"} 👋
            </p>
          </div>

        </div>

        {/* DASHBOARD */}
        {menu === "dashboard" && (
          <>
            <div style={heroBox}>
              <div>
                <p style={heroMini}>✨ Selamat Datang</p>

                <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
                  Halo, {nama || "Siswa"} 👋
                </h1>

                <p style={{ color: "#f3f4f6", maxWidth: "650px" }}>
                  Sampaikan aspirasi untuk sekolah yang lebih baik.
                </p>

                <button onClick={() => setMenu("input")} style={heroBtn}>
                  ✨ Buat Aspirasi
                </button>
              </div>

              <div style={circle1}></div>
              <div style={circle2}></div>
            </div>

            {/* CARD */}
            <div style={cardContainer}>
              <Card title="Total Aspirasi" value={total} color="#ef4444" icon="📩" />
              <Card title="Menunggu" value={menunggu} color="#f59e0b" icon="🕐" />
              <Card title="Diproses" value={diproses} color="#3b82f6" icon="⏳" />
              <Card title="Selesai" value={selesai} color="#10b981" icon="✅" />
            </div>

            {/* AKTIVITAS */}
            <div style={activityBox}>
              <div style={activityHeader}>
                <h2 style={{ color: "#991b1b", margin: 0 }}>
                  Aktivitas Terkini
                </h2>
              </div>

              {data.slice(0, 5).map((item, i) => (
                <div key={i} style={activityItem}>
                  <div>
                    <h3 style={{ margin: 0 }}>{item.ket}</h3>
                    <p style={{ margin: 0, color: "#6b7280" }}>
                      Feedback: {item.feedback || "-"}
                    </p>
                  </div>

                  <span style={statusBadge(item.status)}>
                    {item.status || "Menunggu"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* INPUT */}
        {menu === "input" && (
          <div style={pageBox}>
            <InputAspirasi />
          </div>
        )}

        {/* HISTORY */}
        {menu === "history" && (
          <div style={pageBox}>
            <History />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function MenuItem({ text, active, onClick }) {
  return (
    <div onClick={onClick} style={active ? activeMenu : menuStyle}>
      {text}
    </div>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <div style={card}>
      <div style={cardTop}>
        <div style={{ ...iconBox, background: color }}>{icon}</div>
        <h1 style={{ margin: 0, color }}>{value}</h1>
      </div>
      <p style={{ marginTop: "15px", color: "#6b7280" }}>{title}</p>
    </div>
  );
}

/* ================= STYLE ================= */

const container = {
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

const menuStyle = {
  padding: "14px 16px",
  borderRadius: "14px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.08)",
};

const activeMenu = {
  ...menuStyle,
  background: "rgba(255,255,255,0.2)",
};

const menuBox = {
  padding: "14px 16px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.08)",
  display: "flex",
  justifyContent: "space-between",
};

const badge = {
  background: "#f87171",
  padding: "3px 8px",
  borderRadius: "20px",
};

const content = {
  flex: 1,
  padding: "30px",
};

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "30px",
};

const heroBox = {
  background: "linear-gradient(135deg, #991b1b, #374151)",
  borderRadius: "28px",
  padding: "45px",
  color: "white",
  marginBottom: "25px",
};

const heroMini = { color: "#fecaca" };

const heroBtn = {
  marginTop: "25px",
  background: "white",
  color: "#991b1b",
  border: "none",
  padding: "15px",
  borderRadius: "15px",
  cursor: "pointer",
};

const circle1 = {};
const circle2 = {};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "22px",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
};

const iconBox = {
  width: "50px",
  height: "50px",
  borderRadius: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const activityBox = {
  background: "white",
  padding: "25px",
  borderRadius: "22px",
  marginTop: "25px",
};

const activityHeader = {
  display: "flex",
  justifyContent: "space-between",
};

const activityItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 0",
};

const pageBox = {
  background: "white",
  padding: "20px",
  borderRadius: "22px",
};

const profileBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "20px",
};

const avatar = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#fee2e2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#dc2626",
};

const logoutBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
};

const statusBadge = (status) => ({
  padding: "8px 14px",
  borderRadius: "10px",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  background:
    status === "Selesai"
      ? "#10b981"
      : status === "Diproses" || status === "Proses"
      ? "#3b82f6"
      : "#f59e0b",
});