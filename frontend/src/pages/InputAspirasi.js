import { useState } from "react";
import axios from "axios";

export default function InputAspirasi() {

  const lokasiKategori = {
    1: [
      "Lab Komputer",
      "Perpustakaan",
      "Kantin",
      "Toilet",
      "Lapangan",
      "UKS"
    ],

    2: [
      "Toilet",
      "Kantin",
      "Halaman Sekolah",
      "Koridor",
      "Ruang Kelas"
    ],

    3: [
      "Gerbang Sekolah",
      "Parkiran",
      "Koridor",
      "Lapangan",
      "Area Belakang Sekolah"
    ],

    4: [
      "X PPLG",
      "X TJKT",
      "X MPLB",
      "XI PPLG",
      "XI TJKT",
      "XI MPLB",
      "XII PPLG",
      "XII TJKT",
      "XII MPLB"
    ]
  };

  const [form, setForm] = useState({
    nis: "",
    kelas: "",
    kategori_id: "",
    lokasi: "",
    ket: "",
    foto: null,
  });

  const kirim = async (e) => {
    e.preventDefault();

    // ================= TAMBAHAN VALIDASI KETAT =================
    // Memastikan tidak ada data yang kosong (termasuk spasi kosong / trim)
    if (
      !form.nis.trim() || 
      !form.kelas || 
      !form.kategori_id || 
      !form.lokasi || 
      !form.ket.trim() || 
      !form.foto
    ) {
      alert("⚠️ Semua data wajib diisi! Termasuk foto pendukung.");
      return; // Berhenti di sini, tidak akan lanjut kirim ke backend
    }
    // ===========================================================

    const data = new FormData();
    data.append("nis", form.nis);
    data.append("kelas", form.kelas);
    data.append("kategori_id", form.kategori_id);
    data.append("lokasi", form.lokasi);
    data.append("ket", form.ket);
    data.append("foto", form.foto);

    try {
      await axios.post("http://localhost:3000/api/aspirasi", data);

      alert("Aspirasi berhasil dikirim 💖");

      setForm({
        nis: "",
        kelas: "",
        kategori_id: "",
        lokasi: "",
        ket: "",
        foto: null,
      });

    } catch (err) {
      console.log(err);
      alert("Terjadi error 😭");
    }
  };

  return (
    <div style={wrapper}>

      {/* LEFT */}
      <div style={leftBox}>

        <div style={tipsCard}>
          <div style={iconBox}>💡</div>

          <h2 style={tipsTitle}>
            Suarakan Perubahan
          </h2>

          <p style={tipsText}>
            Aspirasi Anda adalah langkah awal menuju lingkungan sekolah
            yang lebih baik. Berikan detail lengkap agar mudah diproses.
          </p>

          <div style={tipsList}>
            <p>✅ Gunakan bahasa yang sopan</p>
            <p>✅ Sertakan bukti pendukung</p>
            <p>✅ Jelaskan lokasi secara detail</p>
          </div>
        </div>

        {/* QUOTE */}
        <div style={quoteBox}>
          <h3 style={{ marginBottom:"15px" }}>
            Inspirasi Pekan Ini
          </h3>

          <p style={{
            lineHeight:"28px",
            fontSize:"18px",
            fontWeight:"500"
          }}>
            "Sekolah yang baik adalah sekolah yang mendengarkan suara siswa."
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <form onSubmit={kirim} style={formBox}>

        <h2 style={formTitle}>
          📝 Formulir Pengisian Aspirasi
        </h2>

        {/* ROW */}
        <div style={row}>
          <div style={field}>
            <label style={label}>NIS</label>

            <input
              required
              placeholder="Masukkan NIS"
              value={form.nis}
              onChange={e=>setForm({...form, nis:e.target.value})}
              style={input}
            />
          </div>

          <div style={field}>
            <label style={label}>Kelas</label>

            <select
              required
              value={form.kelas}
              onChange={e=>setForm({...form, kelas:e.target.value})}
              style={input}
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
        </div>

        {/* ROW */}
        <div style={row}>
          <div style={field}>
            <label style={label}>Kategori Aspirasi</label>

            <select
              required
              value={form.kategori_id}
              onChange={e=>
                setForm({
                  ...form,
                  kategori_id:e.target.value,
                  lokasi:""
                })
              }
              style={input}
            >
              <option value="">Pilih Kategori</option>
              <option value="1">Fasilitas</option>
              <option value="2">Kebersihan</option>
              <option value="3">Keamanan</option>
              <option value="4">Sarana Kelas</option>
            </select>
          </div>

          <div style={field}>
            <label style={label}>Lokasi</label>

            <select
              required
              value={form.lokasi}
              onChange={e=>
                setForm({...form,lokasi:e.target.value})
              }
              style={input}
            >
              <option value="">
                Pilih Lokasi
              </option>

              {form.kategori_id &&
                lokasiKategori[form.kategori_id]?.map((lokasi, index) => (
                  <option key={index} value={lokasi}>
                    {lokasi}
                  </option>
                ))
              }

            </select>
          </div>
        </div>

        {/* TEXTAREA */}
        <div style={{ marginTop:"20px" }}>
          <label style={label}>Deskripsi Aspirasi</label>

          <textarea
            required
            placeholder="Tulis detail aspirasi atau keluhan di sini..."
            value={form.ket}
            onChange={e=>setForm({...form,ket:e.target.value})}
            style={{
              ...input,
              height:"180px",
              resize:"none"
            }}
          />
        </div>

        {/* FILE */}
        <div style={{ marginTop:"25px" }}>
          <label style={label}>Upload Foto Pendukung</label>

          <div style={uploadBox}>
            <input
              required
              type="file"
              onChange={e=>setForm({...form,foto:e.target.files[0]})}
            />

            <p style={{
              fontSize:"13px",
              color:"#6b7280",
              marginTop:"10px"
            }}>
              PNG, JPG (Max. 5MB)
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div style={buttonRow}>
          <button
            type="button"
            style={cancelBtn}
          >
            Batalkan
          </button>

          <button
            type="submit"
            style={submitBtn}
          >
            🚀 Kirim Aspirasi
          </button>
        </div>

      </form>
    </div>
  );
}

/* ================= STYLE ================= */

const wrapper = {
  display:"flex",
  gap:"25px",
  flexWrap:"wrap"
};

const leftBox = {
  width:"320px"
};

const tipsCard = {
  background:"#ffffff",
  borderRadius:"20px",
  padding:"25px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.05)"
};

const iconBox = {
  width:"55px",
  height:"55px",
  borderRadius:"15px",
  background:"#fee2e2",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontSize:"28px",
  marginBottom:"20px"
};

const tipsTitle = {
  fontSize:"20px",
  marginBottom:"15px",
  color:"#111827"
};

const tipsText = {
  color:"#4b5563",
  lineHeight:"30px",
  fontSize:"15px"
};

const tipsList = {
  marginTop:"20px",
  color:"#374151",
  lineHeight:"35px"
};

const quoteBox = {
  marginTop:"15px",
  background:"linear-gradient(135deg,#7f1d1d,#dc2626)",
  borderRadius:"20px",
  padding:"30px",
  color:"white",
  minHeight:"180px",

  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  textAlign:"center"
};

const formBox = {
  flex:1,
  background:"#ffffff",
  borderRadius:"20px",
  padding:"30px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.05)"
};

const formTitle = {
  color:"#7f1d1d",
  marginBottom:"30px"
};

const row = {
  display:"flex",
  gap:"20px",
  marginBottom:"20px",
  flexWrap:"wrap"
};

const field = {
  flex:1,
  minWidth:"250px"
};

const label = {
  display:"block",
  marginBottom:"8px",
  fontWeight:"600",
  color:"#374151"
};

const input = {
  width:"100%",
  height:"55px",
  padding:"14px",
  borderRadius:"12px",
  border:"1px solid #cbd5e1",
  outline:"none",
  fontSize:"14px",
  boxSizing:"border-box"
};

const uploadBox = {
  marginTop:"10px",
  border:"2px dashed #fca5a5",
  borderRadius:"15px",
  padding:"40px",
  textAlign:"center",
  background:"#fff7f7"
};

const buttonRow = {
  display:"flex",
  justifyContent:"flex-end",
  gap:"15px",
  marginTop:"30px"
};

const cancelBtn = {
  padding:"12px 30px",
  borderRadius:"12px",
  border:"1px solid #d1d5db",
  background:"#ffffff",
  cursor:"pointer",
  fontWeight:"600"
};

const submitBtn = {
  padding:"12px 30px",
  borderRadius:"12px",
  border:"none",
  background:"#dc2626",
  color:"white",
  cursor:"pointer",
  fontWeight:"600",
  boxShadow:"0 5px 10px rgba(220,38,38,0.3)"
};