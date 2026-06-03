import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function User() {

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: null,
    nama: "",
    no_telp: "",
    kelas: "",
    username: "",
    password: ""
  });

  const load = () => {
    axios.get("http://localhost:3000/api/user")
      .then(res => setData(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const tambahUser = async () => {
    try {

      if (form.id) {
        await axios.put(`http://localhost:3000/api/user/${form.id}`, form);
        alert("User berhasil diupdate");
      } else {
        await axios.post("http://localhost:3000/api/user", form);
        alert("User berhasil ditambahkan");
      }

      setForm({
        id: null,
        nama: "",
        no_telp: "",
        kelas: "",
        username: "",
        password: ""
      });

      setShowForm(false);
      load();

    } catch (err) {
      console.log(err);
      alert("Terjadi error");
    }
  };

  const hapusUser = async (id) => {
    if (window.confirm("Yakin mau hapus user?")) {
      await axios.delete(`http://localhost:3000/api/user/${id}`);
      load();
    }
  };

  const editUser = (u) => {
    setForm({
      id: u.id,
      nama: u.nama,
      no_telp: u.no_telp || "",
      kelas: u.kelas || "",
      username: u.username,
      password: ""
    });

    setShowForm(true);
  };

  const filtered = data.filter((u) =>
    (u.nama || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.username || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>

        <div>

          {/* LOGO */}
          <div style={{ marginBottom: "40px" }}>

            <div style={logoBox}>
              ❤️
            </div>

            <h2 style={{ margin: "15px 0 5px 0" }}>
              Aspirasi Siswa
            </h2>

            <p style={adminText}>
              Admin Dashboard
            </p>

          </div>

          {/* MENU */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <Link to="/dashboard" style={menu}>
              🏠 Dashboard
            </Link>

            <Link to="/user" style={activeMenu}>
              👤 Data User
            </Link>

            <div style={menu}>
              📊 Total User
              <span style={badge}>{data.length}</span>
            </div>

          </div>

        </div>

        {/* LOGOUT */}
        <div style={logoutBox}>
          🚪 Logout
        </div>

      </div>

      {/* CONTENT */}
      <div style={content}>

        {/* TOPBAR */}
        <div style={topbar}>

          <input
            type="text"
            placeholder="Cari nama atau username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <div style={adminBox}>
            <div>
              <h4 style={{ margin: 0 }}>Admin</h4>
              <small>Administrator</small>
            </div>

            <div style={avatar}>
              A
            </div>
          </div>

        </div>

        {/* TITLE */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ marginBottom: "5px" }}>
            👤 Kelola User
          </h1>

          <p style={{ color: "#6b7280" }}>
            Tambah data user baru ke dalam sistem database.
          </p>
        </div>

        {!showForm ? (

          <div style={card}>

            <div style={headerCard}>

              <h2>Daftar Pengguna</h2>

              <button
                style={btnTambah}
                onClick={() => setShowForm(true)}
              >
                + Tambah User
              </button>

            </div>

            <table style={table}>

              <thead>
                <tr>
                  <th style={thStyle}>No</th>
                  <th style={thStyle}>Nama</th>
                  <th style={thStyle}>No Telp</th>
                  <th style={thStyle}>Kelas</th>
                  <th style={thStyle}>Username</th>
                  <th style={thStyle}>Password</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((u, i) => (

                  <tr key={u.id}>

                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{u.nama}</td>
                    <td style={tdStyle}>{u.no_telp || "-"}</td>
                    <td style={tdStyle}>{u.kelas || "-"}</td>
                    <td style={tdStyle}>{u.username}</td>

                    <td style={tdStyle}>
                      {u.password
                        ? u.password.substring(0, 10) + "..."
                        : "-"}
                    </td>

                    <td style={tdStyle}>
                      <div style={aksiBox}>

                        <button
                          style={editBtn}
                          onClick={() => editUser(u)}
                        >
                          Edit
                        </button>

                        <button
                          style={hapusBtn}
                          onClick={() => hapusUser(u.id)}
                        >
                          Hapus
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div style={card}>

            <h2 style={{ marginBottom: "30px" }}>
              👥 {form.id ? "Edit User" : "Tambah User"}
            </h2>

            <div style={formGroup}>
              <label>Nama Lengkap</label>

              <input
                style={input}
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }
              />
            </div>

            <div style={formGroup}>
              <label>Username</label>

              <input
                style={input}
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            <div style={formGroup}>
              <label>Password</label>

              <input
                type="password"
                style={input}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* ✅ KELAS DROPDOWN */}
            <div style={formGroup}>
              <label>Kelas</label>

              <select
                style={input}
                value={form.kelas}
                onChange={(e) =>
                  setForm({ ...form, kelas: e.target.value })
                }
              >
                <option value="">Pilih Kelas</option>

                <option value="X PPLG">X PPLG</option>
                <option value="X TJKT">X TJKT</option>
                <option value="X MPLB">X MPLB</option>

                <option value="XI PPLG">XI PPLG</option>
                <option value="XI TJKT">XI TJKT</option>
                <option value="XI MPLB">XI MPLB</option>

                <option value="XII PPLG">XII PPLG</option>
                <option value="XII TJKT">XII TJKT</option>
                <option value="XII MPLB">XII MPLB</option>
              </select>
            </div>

            <div style={formGroup}>
              <label>No Telepon</label>

              <input
                style={input}
                placeholder="08..."
                value={form.no_telp}
                onChange={(e) =>
                  setForm({ ...form, no_telp: e.target.value })
                }
              />
            </div>

            <div style={buttonRow}>

              <button
                style={saveBtn}
                onClick={tambahUser}
              >
                Simpan
              </button>

              <button
                style={cancelBtn}
                onClick={() => setShowForm(false)}
              >
                Batal / Kembali
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

/* ================= STYLE ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  background: "#f3f4f6"
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

const adminText = {
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

const logoutBox = {
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.1)",
  cursor: "pointer",
  textAlign: "center",
};

const content = {
  flex: 1,
  padding: "30px"
};

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px"
};

const searchInput = {
  width: "400px",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db"
};

const adminBox = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const avatar = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#ef4444",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold"
};

const card = {
  background: "white",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const headerCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const btnTambah = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb",
  fontSize: "14px"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "14px",
  verticalAlign: "middle"
};

const aksiBox = {
  display: "flex",
  gap: "8px",
  alignItems: "center"
};

const editBtn = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
};

const hapusBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px"
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginTop: "8px"
};

const buttonRow = {
  display: "flex",
  gap: "20px",
  marginTop: "30px"
};

const saveBtn = {
  flex: 1,
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer"
};

const cancelBtn = {
  flex: 1,
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer"
};