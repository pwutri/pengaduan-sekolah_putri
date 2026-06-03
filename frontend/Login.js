import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {

      // 🔥 LOGIN ADMIN DULU
      let res = await axios.post(
        "http://localhost:3000/api/admin/login",
        form
      );

      let role = "admin";

      // 🔥 KALAU GAGAL → LOGIN USER
      if (
        !res.data.message ||
        !res.data.message.includes("Login berhasil")
      ) {

        res = await axios.post(
          "http://localhost:3000/api/user/login",
          form
        );

        role = "user";
      }

      // 🔥 BERHASIL LOGIN
      if (
        res.data.message &&
        res.data.message.includes("Login berhasil")
      ) {

        alert("Login berhasil 💖");

        // 🔥 SIMPAN DATA LOGIN
        localStorage.setItem("role", role);

        // 🔥 SIMPAN DATA USER
        if (res.data.user) {
          localStorage.setItem("nama", res.data.user.nama || "");
          localStorage.setItem("kelas", res.data.user.kelas || "");
          localStorage.setItem("username", res.data.user.username || "");
        }

        // 🔥 PINDAH HALAMAN
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard-user");
        }

      } else {
        alert(res.data.message || "Login gagal 😭");
      }

    } catch (err) {
      console.log(err);
      alert("Tidak bisa connect ke server 😭");
    }
  };

  return (
    <div style={wrapper}>

      {/* LEFT */}
      <div style={leftSide}>

        <div style={overlay}></div>

        <div style={leftContent}>
          <h1 style={bigTitle}>
            ❤️ Aspirasi Siswa
          </h1>

          <p style={desc}>
            Sampaikan pendapat, kritik, dan saranmu
            untuk menciptakan sekolah yang lebih baik.
          </p>

          <div style={badge}>
            ✨ Suara kamu berarti
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div style={rightSide}>

        <form onSubmit={login} style={formBox}>

          <h2 style={title}>
            Login Account
          </h2>

          <p style={subtitle}>
            Selamat datang kembali 👋
          </p>

          {/* USERNAME */}
          <div style={{ marginTop: "20px" }}>
            <label style={label}>
              Username
            </label>

            <input
              type="text"
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value
                })
              }
              style={input}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginTop: "15px" }}>
            <label style={label}>
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
              style={input}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={button}
            onMouseOver={(e) =>
              e.target.style.background = "#b91c1c"
            }
            onMouseOut={(e) =>
              e.target.style.background = "#dc2626"
            }
          >
            Login ❤️
          </button>

          {/* TEXT */}
          <p style={footerText}>
            Sistem Aspirasi Sekolah
          </p>

        </form>

      </div>

    </div>
  );
}

/* ================= STYLE ================= */

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  background: "#f3f4f6"
};

const leftSide = {
  flex: 1,
  position: "relative",
  background:
    "linear-gradient(135deg, #991b1b, #374151)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
};

const overlay = {
  position: "absolute",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.05)",
  top: "-120px",
  right: "-120px"
};

const leftContent = {
  position: "relative",
  zIndex: 2,
  color: "white",
  padding: "50px",
  maxWidth: "500px"
};

const bigTitle = {
  fontSize: "55px",
  marginBottom: "20px",
  lineHeight: "65px"
};

const desc = {
  fontSize: "17px",
  lineHeight: "30px",
  color: "#e5e7eb"
};

const badge = {
  marginTop: "30px",
  display: "inline-block",
  background: "rgba(255,255,255,0.15)",
  padding: "12px 18px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)"
};

const rightSide = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px"
};

const formBox = {
  width: "100%",
  maxWidth: "400px",
  background: "white",
  padding: "40px",
  borderRadius: "25px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const title = {
  margin: 0,
  color: "#991b1b",
  fontSize: "35px"
};

const subtitle = {
  color: "#6b7280",
  marginTop: "10px"
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#374151",
  fontWeight: "600"
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  outline: "none",
  fontSize: "14px"
};

const button = {
  width: "100%",
  marginTop: "25px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#dc2626",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.3s"
};

const footerText = {
  marginTop: "20px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: "13px"
};