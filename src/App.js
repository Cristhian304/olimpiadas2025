import './App.css';
import { useState } from "react";
import AdminInicio from './admin/pages/AdminInicio';
import CargarPaquetes from './admin/pages/CargarPaquetes';
import ListaPaquetes from './admin/pages/ListaPaquetes';
import PedidosPendientesAdmin from './admin/pages/PedidosPendientesAdmin'; // Importación añadida
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import InicioSesion from "./cliente/componentes/InicioSesion";
import ClienteProductos from "./cliente/componentes/ClienteProductos";
import Carrito from "./cliente/componentes/Carrito";
import Swal from 'sweetalert2';
import PedidosCliente from "./cliente/componentes/PedidosCliente";

function App() {
  const navigate = useNavigate();
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [clienteId, setClienteId] = useState(localStorage.getItem("id_cliente") || "");
  const [carrito, setCarrito] = useState([]);

  const handleLogin = (rol, token, id) => {
    setRol(rol);
    setToken(token);
    setClienteId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("id_cliente", id);
  };

  const handleLogout = () => {
    setRol(null);
    setToken("");
    setClienteId("");
    setCarrito([]);
    localStorage.clear();
    Swal.fire("Sesión finalizada", "Has cerrado sesión correctamente.", "info");
    navigate("/");
  };

  const agregarAlCarrito = (paquete) => {
    setCarrito((prev) => [...prev, paquete]);
    Swal.fire({
      icon: 'info',
      title: '¡Paquete añadido!',
      text: `"${paquete.nombre}" se agregó al carrito correctamente.`,
      timer: 1800,
      showConfirmButton: false
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          rol === null ? (
            <InicioSesion onLogin={handleLogin} />
          ) : rol === "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/cliente" />
          )
        }
      />

      <Route path="/admin" element={<AdminInicio onLogout={handleLogout} />} />
      <Route path="/admin/cargar" element={<CargarPaquetes onLogout={handleLogout} />} />
      <Route path="/admin/lista" element={<ListaPaquetes onLogout={handleLogout} />} />
      <Route path="/admin/pedidos" element={<PedidosPendientesAdmin />} /> {/* Ruta añadida */}
      <Route path="/admin/editar/:id" element={<CargarPaquetes />} />
      
      <Route 
        path="/cliente/pedidos" 
        element={<PedidosCliente token={token} clienteId={clienteId} />} 
      />
      
      <Route
        path="/cliente"
        element={
          <ClienteProductos
            onLogout={handleLogout}
            onAgregarAlCarrito={agregarAlCarrito}
            token={token}
            clienteId={clienteId}
          />
        }
      />
      
      <Route
        path="/cliente/carrito"
        element={
          <Carrito
            productos={carrito}
            onVolver={() => navigate("/cliente")}
            onEliminar={(index) =>
              setCarrito((prev) => prev.filter((_, i) => i !== index))
            }
            irAPedidos={() => navigate("/cliente/pedidos")}
            token={token}
            clienteId={clienteId}
          />
        }
      />
    </Routes>
  );
}

export default App;