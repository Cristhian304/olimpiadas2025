import React from "react";
import "../estilos/estilosCarrito.css";
import Swal from "sweetalert2";

const Carrito = ({ productos, onVolver, onEliminar, irAPendientes }) => {
  const total = productos.reduce((acc, prod) => acc + prod.precio, 0);

  const registrarPaquetesPendientes = () => {
    localStorage.setItem("paquetesPendientes", JSON.stringify(productos));
    console.log("Guardado en paquetesPendientes:", productos);
  };

  const finalizarCompra = async () => {
    const tipoPago = await Swal.fire({
      title: "Seleccioná un método de pago",
      showCancelButton: true,
      confirmButtonText: "Tarjeta de Crédito",
      cancelButtonText: "Tarjeta de Débito",
      icon: "question",
    });

    if (tipoPago.isConfirmed || tipoPago.dismiss === Swal.DismissReason.cancel) {
      const resultado = await Swal.fire({
        title: "Ingresá los datos de tu tarjeta",
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre en la tarjeta">
          <input id="numero" class="swal2-input" placeholder="Número de tarjeta">
          <input id="vencimiento" class="swal2-input" placeholder="Vencimiento (MM/AA)">
          <input id="cvv" class="swal2-input" placeholder="CVV">
        `,
        focusConfirm: false,
        preConfirm: () => {
          const nombre = document.getElementById("nombre").value;
          const numero = document.getElementById("numero").value;
          const vencimiento = document.getElementById("vencimiento").value;
          const cvv = document.getElementById("cvv").value;

          if (!nombre || !numero || !vencimiento || !cvv) {
            Swal.showValidationMessage("Completá todos los campos");
            return false;
          }

          return { nombre, numero, vencimiento, cvv };
        }
      });

      if (resultado.isConfirmed) {
        Swal.fire("¡Compra exitosa!", "Tu paquete fue registrado correctamente.", "success");
        registrarPaquetesPendientes();
      }
    }
  };

  return (
    <div className="contenedor-principal">
      <aside className="menu-lateral">
        <div className="icono-carrito">🛒</div>
        <button className="btn-vermas" onClick={irAPendientes}>
            Paquetes Pendientes
        </button>
        <button className="btn-volver" onClick={onVolver}>
          Volver a Productos
        </button>
      </aside>

      <main className="contenido-carrito">
        <div className="bienvenida">Bienvenido, Usuario</div>
        <h1 className="titulo-carrito">Lista de Productos Agregados</h1>

        <div className="contenedor-lista">
          {productos.map((prod, index) => (
            <div key={index} className="tarjeta-carrito">
              <div>
                <h2>{prod.ciudad}</h2>
                <p><strong>Destino:</strong> {prod.destino}</p>
                <p><strong>Saliendo desde:</strong> {prod.salida}</p>
                <p><strong>Hotel:</strong> {prod.hotel}</p>
              </div>
              <div className="precio-final">
                <p>Precio Final:</p>
                <h3>${prod.precio.toLocaleString()}</h3>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminar(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {productos.length > 0 && (
            <div className="zona-total-y-boton">
              <div className="total-precio">
                <p>Precio Total:</p>
                <h2>${total.toLocaleString()}</h2>
              </div>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Carrito;
