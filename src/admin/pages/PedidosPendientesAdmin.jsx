import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LayoutAdmin from "../LayoutAdmin"; // Asegurate que exista este layout

export default function PedidosPendientesAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => {
        console.error("Error al obtener pedidos pendientes:", err);
        Swal.fire("Error", "No se pudieron obtener los pedidos", "error");
      });
  }, []);

  const marcarComoEntregado = (id_pedido, emailCliente) => {
    fetch(`http://localhost:8080/api/pedidos/${id_pedido}/entregar`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al marcar como entregado");
        }
        // Podés enviar el email acá más adelante 👇
        // enviarEmailConfirmacion(emailCliente);
        Swal.fire("Éxito", "Pedido marcado como entregado", "success");
        setPedidos(prev => prev.filter(p => p.id !== id_pedido)); // Lo saca de la lista
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <LayoutAdmin>
      <main style={{ padding: "2rem" }}>
        <h2>Pedidos Pendientes</h2>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {pedidos.length === 0 ? (
            <p>No hay pedidos pendientes.</p>
          ) : (
            <ul>
              {pedidos.map(p => (
                <li key={p.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
                  <p><strong>Pedido #{p.id}</strong> - Cliente: {p.clienteEmail}</p>
                  <p>Estado: {p.estado}</p>
                  <ul>
                    {p.paquetes.map(pa => (
                      <li key={pa.id}>{pa.nombre} (${pa.precio})</li>
                    ))}
                  </ul>
                  <button onClick={() => marcarComoEntregado(p.id, p.clienteEmail)}>
                    Entregar Pedido
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </LayoutAdmin>
  );
}
