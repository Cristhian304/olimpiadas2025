import React from "react";
import "../estilos/estilosCarrito.css";
import LayoutCliente from "../LayoutCliente";
import Swal from "sweetalert2";

const Carrito = ({ productos, onVolver, onEliminar, irAPedidos }) => {
  const total = productos.reduce((acc, prod) => acc + prod.precio, 0);

 const finalizarCompra = async () => {
  const id_cliente = parseInt(localStorage.getItem("id_cliente"));

  const token = localStorage.getItem("token");

  if (!id_cliente || productos.length === 0) {
    Swal.fire("Error", "No hay datos válidos para registrar el pedido.", "error");
    return;
  }

  const ahora = new Date();
  const tresDiasDespues = new Date();
  tresDiasDespues.setDate(ahora.getDate() + 3);

  const pedido = {
    clienteId: parseInt(id_cliente),
    paqueteIds: productos.map(p => p.id), // Esto DEBE ser un array de números
    fechainic: ahora.toISOString(),
    fechafin: tresDiasDespues.toISOString(),
    estado: "pendiente"
  };

  try {
    const response = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Si el backend lo necesita
      },
      body: JSON.stringify(pedido),
    });

    const resText = await response.text(); // TEMPORAL: para ver el error real

    if (!response.ok) {
      console.error("Respuesta completa del backend:", resText);
      throw new Error("No se pudo registrar el pedido. Revisa consola.");
    }

    Swal.fire({
      icon: "success",
      title: "¡Pedido realizado!",
      text: "Tu pedido fue registrado con éxito.",
      confirmButtonText: "Ver mis pedidos",
    }).then(() => {
      irAPedidos(); // Va a /cliente/pedidos
    });

  } catch (error) {
    console.error("Error al registrar pedido:", error);
    Swal.fire("Error", error.message, "error");
  }
};



  return (
    <LayoutCliente>
      <main className="contenido-carrito">
        <h1 className="titulo-carrito">Paquetes Seleccionados</h1>
        <div className="contenedor-lista">
          {productos.length === 0 ? (
            <p className="mensaje-vacio">No hay paquetes en el carrito.</p>
          ) : (
            productos.map((prod, index) => (
              <div key={index} className="tarjeta-carrito">
                <div className="detalle-paquete">
                  <h3>{prod.nombre}</h3>
                  <p><strong>Tipo:</strong> {prod.tipo}</p>
                  <p><strong>Ubicación:</strong> {prod.ubicacion}</p>
                  <p><strong>Capacidad:</strong> {prod.capacidad} personas</p>
                </div>
                <div className="acciones-paquete">
                  <p className="precio">${prod.precio.toLocaleString()}</p>
                  <button className="btn-eliminar" onClick={() => onEliminar(index)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}

          {productos.length > 0 && (
            <div className="zona-final">
              <div className="total-precio">
                <strong>Total:</strong> ${total.toLocaleString()}
              </div>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </main>
    </LayoutCliente>
  );
};

export default Carrito;
