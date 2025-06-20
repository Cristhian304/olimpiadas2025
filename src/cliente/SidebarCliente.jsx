import { Link } from "react-router-dom";

export default function SidebarCliente() {
  return (
    <div style={{
      backgroundColor: "#F0F8FF",
      padding: "2rem",
      height: "350vh",
      width: "250px",
      borderRight: "1px solid #ccc",
      overflowY: "auto"
    }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Link to="/cliente" style={linkStyle}>Productos</Link>
        <Link to="/cliente/carrito" style={linkStyle}>🛒 Carrito</Link>
        <Link to="/cliente/pedidos" style={linkStyle}>Mis Pedidos</Link>
        {/* Agregá más si tenés más pantallas */}
      </nav>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px"
};
