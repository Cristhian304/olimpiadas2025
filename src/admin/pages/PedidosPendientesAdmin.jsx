import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LayoutAdmin from "../LayoutAdmin";
import './PedidosAdmin.css'; // Archivo CSS adicional

export default function PedidosPendientesAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/pedidos", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Error al obtener pedidos");
        
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        Swal.fire("Error", "No se pudieron cargar los pedidos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [token]);

  const marcarComoEntregado = async (id_pedido) => {
    try {
      const response = await fetch(`http://localhost:8080/api/pedidos/${id_pedido}/entregar`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Error al actualizar");

      Swal.fire("Éxito", "Pedido marcado como entregado", "success");
      setPedidos(prev => prev.filter(p => p.id !== id_pedido));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <LayoutAdmin>
      <div className="pedidos-admin-container">
        <h2 className="pedidos-titulo">📋 Pedidos Pendientes</h2>
        
        {loading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : pedidos.length === 0 ? (
          <div className="no-pedidos">No hay pedidos pendientes</div>
        ) : (
          <div className="tabla-pedidos-container">
            <table className="tabla-pedidos">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Cliente</th>
                  <th>Paquetes</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.clienteEmail}</td>
                    <td>
                      <ul className="lista-paquetes">
                        {pedido.paquetes.map(paquete => (
                          <li key={paquete.id}>
                            {paquete.nombre} (${paquete.precio.toLocaleString()})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${pedido.paquetes.reduce((sum, p) => sum + p.precio, 0).toLocaleString()}</td>
                    <td>
                      <button 
                        className="btn-entregar"
                        onClick={() => marcarComoEntregado(pedido.id, pedido.clienteEmail)}
                      >
                        Marcar como entregado
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}