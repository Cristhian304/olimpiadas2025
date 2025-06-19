import React from "react";
import "../estilos/estilosInfo.css";
import Swal from "sweetalert2";

const InfoMendoza = ({onVolver,irAlCarrito,onAgregar}) => {
  return (
    <div className="contenedor-info">
      <div className="menu-lateral">
        <div className="icono-carrito">🛒</div>
        <button className="boton-estandar" onClick={irAlCarrito}>Ver Carrito</button>
        <div className="texto-pendientes">Pedidos Pendientes</div>
        <button className="btn-volver" onClick={() => onVolver && onVolver()}>
          Volver a Productos
        </button>
      </div>

      <div className="contenido-info">
        <div className="bienvenida">Bienvenido, Usuario</div>

        <div className="tarjeta-info">
          <div className="col-izq">
            <p><strong>Paquete a Mendoza - 3 noches 3*</strong></p>
            <p>Paga en 9 cuotas sin interés</p>
            <ul>
              <li><strong>Duración:</strong> 3 noches</li>
              <li><strong>Destinos:</strong> Mendoza</li>
              <li><strong>Saliendo desde:</strong> Buenos Aires</li>
              <li><strong>Fecha de salida:</strong> Mié. 01/10/25 al Sáb. 04/10/25</li>
              <li><strong>Pasajeros:</strong> 2 pasajeros, 1 habitación</li>
            </ul>
            <p><strong>El precio incluye</strong></p>
            <ul>
              <li>Pasaje aéreo Buenos Aires/ Mendoza/ Buenos Aires con Aerolíneas Argentinas</li>
              <li>Incluye equipaje de mano (1 pieza de 8kg) y equipaje en bodega (1 pieza de 15kg)</li>
              <li>Traslado aeropuerto / hotel / aeropuerto</li>
              <li>3 noches de alojamiento con régimen desayuno</li>
              <li>Asistencia al Viajero</li>
            </ul>
          </div>

          <div className="col-der">
            <h2>Mendoza</h2>
            <hr />
            <p className="precio"><strong>Precio final: </strong>$504.357,84</p>
            <button className="btn-carrito" onClick={onAgregar}>Añadir al Carrito</button>
            <div className="formas-pago">
              <p><strong>Formas de pago</strong></p>
              <ul>
                <li>Tarjeta de crédito</li>
                <li>Tarjeta de débito</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMendoza;
