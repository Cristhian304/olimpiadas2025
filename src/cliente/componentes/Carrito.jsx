import React from "react";
import "../estilos/estilosCarrito.css";
import LayoutCliente from "../LayoutCliente";
import Swal from "sweetalert2";

const Carrito = ({ productos, onVolver, onEliminar, irAPedidos }) => {
  const total = productos.reduce((acc, prod) => acc + prod.precio, 0);

  const finalizarCompra = async () => {
    const id_cliente = parseInt(localStorage.getItem("id_cliente"));
    const token = localStorage.getItem("token");

    // Validaciones mejoradas
    if (!token) {
      Swal.fire("Error", "No estás autenticado. Por favor inicia sesión.", "error");
      return;
    }

    if (!id_cliente || isNaN(id_cliente)) {
      Swal.fire("Error", "No se ha identificado correctamente al cliente.", "error");
      return;
    }

    if (productos.length === 0) {
      Swal.fire("Error", "No hay productos en el carrito.", "error");
      return;
    }

    const ahora = new Date();
    const tresDiasDespues = new Date();
    tresDiasDespues.setDate(ahora.getDate() + 3);

    const pedido = {
      clienteId: id_cliente,
      paqueteIds: productos.map(p => parseInt(p.id)),
      fechainic: ahora.toISOString(),
      fechafin: tresDiasDespues.toISOString(),
      estado: "pendiente"
    };

    try {
      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pedido),
      });

      // Manejo mejorado de la respuesta
      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Error del backend:", responseData);
        throw new Error(responseData?.message || "No se pudo registrar el pedido. Código: " + response.status);
      }

      // Limpiar el carrito después de éxito
      productos.forEach((_, index) => onEliminar(index));

      Swal.fire({
        icon: "success",
        title: "¡Pedido realizado!",
        text: "Tu pedido fue registrado con éxito.",
        confirmButtonText: "Ver mis pedidos",
      }).then(() => {
        irAPedidos();
      });

    } catch (error) {
      console.error("Error al registrar pedido:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al procesar tu pedido",
        footer: "Por favor intenta nuevamente o contacta al soporte"
      });
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
                  <button 
                    className="btn-eliminar" 
                    onClick={() => onEliminar(index)}
                    aria-label="Eliminar paquete"
                  >
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
              <button 
                className="btn-finalizar" 
                onClick={finalizarCompra}
                disabled={productos.length === 0}
              >
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