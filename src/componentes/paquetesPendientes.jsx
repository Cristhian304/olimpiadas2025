import React, { useEffect, useState } from "react";
import "../estilos/estilosPendientes.css";

const PaquetesPendientes = ({ onVolver, irAlCarrito }) => {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("paquetesPendientes");
    if (guardados) {
      setPendientes(JSON.parse(guardados));
    }
  }, []);

  const cancelarPedido = (index) => {
    const nuevos = [...pendientes];
    nuevos.splice(index, 1);
    setPendientes(nuevos);
    localStorage.setItem("paquetesPendientes", JSON.stringify(nuevos));
  };

  return (
    <div className="contenedor-principal">
      <aside className="menu-lateral">
        <div className="icono-carrito">🛒</div>
        <button className="boton-estandar" onClick={irAlCarrito}>Ver Carrito</button>
        <button className="btn-volver" onClick={onVolver}>Volver a Inicio</button>
      </aside>

      <main className="contenido">
        <div className="bienvenida">Bienvenido, Usuario</div>
        <h1 className="titulo-pendientes">Paquetes Pendientes</h1>

        <div className="contenedor-pendientes">
          {pendientes.map((item, index) => (
            <div key={index} className="tarjeta-pendiente">
              <div className="detalle-pendiente">
                <h2>{item.ciudad}</h2>
                <p><strong>Destino:</strong> {item.destino}</p>
                <p><strong>Saliendo desde:</strong> {item.salida}</p>
                <p><strong>Hotel:</strong> {item.hotel}</p>
              </div>
              <button className="btn-cancelar" onClick={() => cancelarPedido(index)}>
                Cancelar Pedido
              </button>
            </div>
          ))}
          {pendientes.length === 0 && <p style={{ color: 'white' }}>No hay paquetes pendientes.</p>}
        </div>
      </main>
    </div>
  );
};

export default PaquetesPendientes;
