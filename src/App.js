import React, { useState } from "react";
import "./estilos/estilosInicio.css";
import Login from "./componentes/inicioSeccion";
import ClienteProductos from "./componentes/clienteProductos";
import InfoBrc from "./componentes/infoBrc";
import InfoMendoza from "./componentes/infoMendoza";
import InfoCordoba from "./componentes/infoCordoba";
import Carrito from "./componentes/carrito";
import PaquetesPendientes from "./componentes/paquetesPendientes";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [vista, setVista] = useState("productos");
  const [carrito, setCarrito] = useState([]);
  const [pendientes, setPendientes] = useState([]);

  const handleLogin = () => {
    setLogueado(true);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setVista("productos");
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const finalizarCompra = (productosFinales) => {
    setPendientes([...pendientes, ...productosFinales]);
    setCarrito([]);
    setVista("pendientes");
  };

  const cancelarPedido = (index) => {
    setPendientes((prev) => prev.filter((_, i) => i !== index));
  };

  const volverAProductos = () => {
    setVista("productos");
  };

  const irAlCarrito = () => {
    setVista("carrito");
  };

  const irAPendientes = () => {
    setVista("pendientes");
  };

  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  if (vista === "infoBrc") {
    return (
      <InfoBrc
        onAgregar={() =>
          agregarAlCarrito({
            ciudad: "Bariloche",
            destino: "Río Negro - Bariloche",
            salida: "Buenos Aires",
            hotel: "Hotel Plaza Bariloche",
            precio: 464196,
          })
        }
        onVolver={volverAProductos}
        irAlCarrito={irAlCarrito}
        irAPendientes={irAPendientes}
      />
    );
  }

  if (vista === "infoMendoza") {
    return (
      <InfoMendoza
        onAgregar={() =>
          agregarAlCarrito({
            ciudad: "Mendoza",
            destino: "Mendoza",
            salida: "Buenos Aires",
            hotel: "Hotel Piazza Suites",
            precio: 400284,
          })
        }
        onVolver={volverAProductos}
        irAlCarrito={irAlCarrito}
        irAPendientes={irAPendientes}
      />
    );
  }

  if (vista === "infoCordoba") {
    return (
      <InfoCordoba
        onAgregar={() =>
          agregarAlCarrito({
            ciudad: "Córdoba",
            destino: "Córdoba",
            salida: "Buenos Aires",
            hotel: 'Gran Hotel “Victoria”',
            precio: 396156,
          })
        }
        onVolver={volverAProductos}
        irAlCarrito={irAlCarrito}
        irAPendientes={irAPendientes}
      />
    );
  }

  if (vista === "carrito") {
    return (
      <Carrito
        productos={carrito}
        onVolver={volverAProductos}
        onEliminar={eliminarDelCarrito}
        onFinalizarCompra={finalizarCompra}
        irAPendientes={irAPendientes}
      />
    );
  }

  if (vista === "pendientes") {
    return (
      <PaquetesPendientes
        paquetes={pendientes}
        onCancelar={cancelarPedido}
        onVolver={volverAProductos}
        irAlCarrito={irAlCarrito}
      />
    );
  }

  return (
    <ClienteProductos
      onSeleccionar={setVista}
      irAlCarrito={irAlCarrito}
      irAPendientes={irAPendientes}
    />
  );
}

export default App;
