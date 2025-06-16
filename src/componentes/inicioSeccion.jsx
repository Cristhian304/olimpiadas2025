import React, { useState } from "react";
import "../estilos/estilosInicio.css";
import fotoinicio from "../assets/fotoinicio.png";
import logo from "../assets/logo.png"; 

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginClick = () => {
    // Acá podrías validar el usuario antes de continuar, si querés.
    onLogin(); // Esto va a cambiar el estado en App.js y mostrar la otra pantalla
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
          src={logo} 
          alt="Logo"
          style={{ width: 85 }}
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

        <button onClick={handleLoginClick}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
