import React, { useEffect, useState } from "react";
import LayoutAdmin from "../LayoutAdmin";
import "./ListaPaquetes.css";
import { Link } from "react-router-dom";

export default function ListaPaquetes() {
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/paquetes")
      .then(res => res.json())
      .then(data => setPaquetes(data))
      .catch(err => console.error("Error al cargar paquetes:", err));
  }, []);

  const eliminarPaquete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este paquete?")) return;
    try {
      await fetch(`http://localhost:8080/api/paquetes/${id}`, { method: "DELETE" });
      setPaquetes(paquetes.filter(p => p.id !== id));
    } catch (error) {
      alert("No se pudo eliminar");
    }
  };

  return (
    <LayoutAdmin>
      <div className="contenedor-tabla">
        <h2>📦 Lista de Paquetes Cargados</h2>
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Capacidad</th>
                <th>Ubicación</th>
                <th>Internacional</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.tipo}</td>
                  <td>{p.descripcion}</td>
                  <td>${p.precio}</td>
                  <td>{p.capacidad}</td>
                  <td>{p.ubicacion}</td>
                  <td>{p.internacional ? "Sí" : "No"}</td>
                  <td>
                    <Link to={`/admin/editar/${p.id}`} className="editar">Editar</Link>
                    <button className="eliminar" onClick={() => eliminarPaquete(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
}
