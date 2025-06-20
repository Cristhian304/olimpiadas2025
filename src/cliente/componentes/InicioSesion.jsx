import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../estilos/estilosInicio.css";
import fotoinicio from "../assets/fotoinicio.png";
import logo from "../assets/logo.png";

export default function InicioSesion({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("id_cliente", data.id);
      onLogin(data.rol);

      Swal.fire("¡Bienvenido!", "Inicio de sesión exitoso.", "success");

      if (data.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fotoinicio})`,
      }}
    >
      <div className="login-box">
        <img src={logo} alt="Logo" style={{ width: 85 }} />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
