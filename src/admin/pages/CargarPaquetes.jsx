import React, { useState, useEffect } from "react";
import LayoutAdmin from "../LayoutAdmin";
import { useParams, useNavigate } from "react-router-dom";
import "./CargarPaquetes.css";

export default function CargarPaquetes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    tipo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    internacional: "",
    capacidad: "",
    ubicacion: "",
  });

  // Si hay id, traemos los datos
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/paquetes/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormulario({
            tipo: data.tipo,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            internacional: data.internacional ? "true" : "false",
            capacidad: data.capacidad,
            ubicacion: data.ubicacion
          });
        })
        .catch(err => console.error("Error al cargar el paquete:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paqueteData = {
      ...formulario,
      precio: parseFloat(formulario.precio),
      capacidad: parseInt(formulario.capacidad),
      internacional: formulario.internacional.toLowerCase() === "true"
    };

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:8080/api/paquetes/${id}`
        : "http://localhost:8080/api/paquetes";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paqueteData),
      });

      if (!response.ok) throw new Error("Error al guardar");

      alert("✅ Paquete " + (id ? "actualizado" : "creado") + " correctamente");
      navigate("/admin/lista");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <LayoutAdmin>
      <div className="admin-container">
        <div className="main-formulario">
          <span className="welcome-text">Bienvenido, Usuario</span>
          <div className="form-box">
            <h2>{id ? "Editar" : "Cargar"} Paquete</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="field">
                  <label>Nombre del Paquete</label>
                  <input name="nombre" value={formulario.nombre} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Tipo de Paquete</label>
                  <input name="tipo" value={formulario.tipo} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label>Precio del Paquete</label>
                  <input type="number" name="precio" value={formulario.precio} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Capacidad</label>
                  <input type="number" name="capacidad" value={formulario.capacidad} onChange={handleChange} required />
                </div>
              </div>

              <div className="field full">
                <label>Descripción</label>
                <textarea name="descripcion" rows="3" value={formulario.descripcion} onChange={handleChange} required />
              </div>

              <div className="row">
                <div className="field">
                  <label>Ubicación</label>
                  <input name="ubicacion" value={formulario.ubicacion} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label>Internacional (true/false)</label>
                  <input name="internacional" value={formulario.internacional} onChange={handleChange} required />
                </div>
              </div>

              <div className="button-container">
                <button type="submit">{id ? "Actualizar" : "Guardar"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
