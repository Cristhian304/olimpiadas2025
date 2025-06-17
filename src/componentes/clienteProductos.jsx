import React from "react";
import "../estilos/estilosClienteProductos.css";

const destinos = [
  {
    ciudad: "Bariloche",
    destino: "Río Negro - Bariloche",
    salida: "Buenos Aires",
    hotel: "Hotel Plaza Bariloche",
    precio: "$464.196",
  },
  {
    ciudad: "Mendoza",
    destino: "Mendoza",
    salida: "Buenos Aires",
    hotel: "Hotel Piazza Suites",
    precio: "$400.284",
  },
  {
    ciudad: "Córdoba",
    destino: "Córdoba",
    salida: "Buenos Aires",
    hotel: 'Gran Hotel “Victoria”',
    precio: "$396.156",
  },
];

const ClienteProductos = ({ onSeleccionar }) => {
  return (
    <div className="contenedor-principal">
      <aside className="menu-lateral">
        <div className="icono-carrito">🛒</div>
        <p className="texto-carrito">Ver Carrito</p>
        <p className="texto-pendientes">Pedidos Pendientes</p>
      </aside>

      <main className="contenido">
        <div className="bienvenida">Bienvenido, Usuario</div>

        {destinos.map((item, index) => (
          <div key={index} className="tarjeta">
            <div className="info">
              <h2>{item.ciudad}</h2>
              <p><strong>Destino:</strong> {item.destino}</p>
              <p><strong>Saliendo desde:</strong> {item.salida}</p>
              <p><strong>Hotel:</strong> {item.hotel}</p>
            </div>
            <div className="precio-vermas">
              <p className="precio-final">
                <strong>Precio:</strong><br />{item.precio}
              </p>
              <button
                className="btn-vermas"
                onClick={() => {
                  if (onSeleccionar) {
                    if (item.ciudad === "Bariloche") {
                      onSeleccionar("infoBrc");
                    } else if (item.ciudad === "Mendoza") {
                      onSeleccionar("infoMendoza");
                    } else if (item.ciudad === "Córdoba") {
                      onSeleccionar("infoCordoba");
                    }
                  }
                }}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ClienteProductos;
