import React, { useState } from "react";
import "./estilos/estilosInicio.css";
import Login from "./componentes/inicioSeccion";
import ClienteProductos from "./componentes/clienteProductos";
import InfoBrc from "./componentes/infoBrc";
import InfoMendoza from "./componentes/infoMendoza";
import InfoCordoba from "./componentes/infoCordoba";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [pantalla, setPantalla] = useState("productos");

  const handleLogin = () => {
    setLogueado(true);
  };

  const handleSeleccionarDestino = (destino) => {
    setPantalla(destino);
  };

  const handleVolver = () => {
    setPantalla("productos");
  };

  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  switch (pantalla) {
    case "infoBrc":
      return <InfoBrc onVolver={handleVolver} />;
    case "infoMendoza":
      return <InfoMendoza onVolver={handleVolver} />;
    case "infoCordoba":
      return <InfoCordoba onVolver={handleVolver} />;
    default:
      return <ClienteProductos onSeleccionar={handleSeleccionarDestino} />;
  }
}

export default App;
