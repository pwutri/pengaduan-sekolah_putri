import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InputAspirasi from "./pages/InputAspirasi";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import History from "./pages/History";
import User from "./pages/User";
import DashboardUser from "./pages/DashboardUser";

export default function App() {
  return (
    <BrowserRouter>

      {/* ❌ NAVBAR DIHAPUS */}

      <Routes>

        {/* 🔥 DEFAULT LANGSUNG KE LOGIN */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />

        {/* USER */}
        <Route path="/dashboard-user" element={<DashboardUser />} />

        {/* (OPTIONAL, kalau masih dipakai di dalam dashboard) */}
        <Route path="/input" element={<InputAspirasi />} />
        <Route path="/history" element={<History />} />

      </Routes>

    </BrowserRouter>
  );
}