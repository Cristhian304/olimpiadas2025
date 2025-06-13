import React, { useState } from "react";
import "../App.css";
import fotoinicio from "../assets/fotoinicio.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fotoinicio})`,
      }}
    >
      <div className="login-box">
        <img
          src="./assets/fotoinicio.png"
          alt="Logo"
          style={{ width: 60, marginBottom: 20 }}
        />
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="E-Mail" />

       <div className="password-container">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña"
  />
  <span className="eye-icon" onClick={togglePassword}>
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>


        <button>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
