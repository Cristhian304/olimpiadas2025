import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <div style={{
      backgroundColor: "#F0F8FF",
      padding: "2rem",
      height: "100vh",
      width: "250px"
    }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <Link to="/admin/cargar" style={linkStyle}>Cargar Paquetes</Link>
        <Link to="/admin/lista" style={linkStyle}>Lista de Paquetes</Link>
        <Link to="/admin/pedidos" style={linkStyle}>Pedidos Pendientes</Link>
        <Link to="/admin/cuenta" style={linkStyle}>Estado de Cuenta</Link>
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