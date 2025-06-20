import "../estilos/estilosClienteProductos.css";
import LayoutCliente from "../LayoutCliente";
import React, { useEffect, useState } from "react";

const ClienteProductos = ({ onSeleccionar, onAgregarAlCarrito }) => {
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/paquetes")
      .then((res) => res.json())
      .then((data) => {
        setPaquetes(data);
      })
      .catch((error) => {
        console.error("Error al cargar los paquetes:", error);
      });
  }, []);

  return (
    <LayoutCliente>
      <main className="contenido">
        <div className="bienvenida">Bienvenido, Usuario</div>

        <div style={{ padding: "2rem" }}>
          <h2>Paquetes disponibles</h2>
          {paquetes.length === 0 ? (
            <p>No hay paquetes cargados aún 😥</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {paquetes.map((p) => (
                <li
                  key={p.id}
                  style={{
                    background: "#f2f2f2",
                    margin: "1rem 0",
                    padding: "1rem",
                    borderRadius: "10px"
                  }}
                >
                  <h3>{p.nombre}</h3>
                  <p><strong>Ubicación:</strong> {p.ubicacion}</p>
                  <p><strong>Descripción:</strong> {p.descripcion}</p>
                  <p><strong>Precio:</strong> ${p.precio}</p>
                  <p><strong>Capacidad:</strong> {p.capacidad} personas</p>
                  <p><strong>Internacional:</strong> {p.internacional ? "Sí" : "No"}</p>
                  <button
                    className="btn-vermas"
                    onClick={() => onAgregarAlCarrito(p)}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}
                  >
                    Añadir al carrito
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </LayoutCliente>
  );
};

export default ClienteProductos;
