import React, { useEffect, useState } from "react";
import LayoutCliente from "../LayoutCliente";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PedidosCliente() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const id_cliente = localStorage.getItem("id_cliente");

  useEffect(() => {
    fetch(`http://localhost:8080/api/pedidos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 403) {
          throw new Error("TOKEN_EXPIRED");
        }
        return res.json();
      })
      .then(data => setPedidos(data))
      .catch(err => {
        if (err.message === "TOKEN_EXPIRED") {
          Swal.fire({
            title: "Sesión vencida",
            text: "Tu sesión ha expirado. Iniciá sesión nuevamente.",
            icon: "warning",
            confirmButtonText: "Volver a iniciar sesión"
          }).then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("clienteId");
            navigate("/"); // redirige al login
          });
        } else {
          console.error("Error al obtener pedidos:", err);
          Swal.fire("Error", err.message, "error");
        }
      });
  }, [id_cliente, token, navigate]);

  return (
    <LayoutCliente>
      <main style={{ padding: "2rem" }}>
        <h2>Mis Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>No tenés ningún pedido.</p>
        ) : (
          <ul>
            {pedidos.map(p => (
              <li key={p.id}>
                Pedido #{p.id} - Estado: <strong>{p.estado}</strong>
                <ul>
                  {p.paquetes.map(pa => (
                    <li key={pa.id}>
                      {pa.nombre} (${pa.precio})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
    </LayoutCliente>
  );
}
