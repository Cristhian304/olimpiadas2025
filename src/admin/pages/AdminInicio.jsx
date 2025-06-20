import SidebarAdmin from "../components/SidebarAdmin";


export default function AdminInicio() {
  return (
    <div style={{ display: "flex", backgroundColor: "#1D6D8F", color: "white", minHeight: "100vh" }}>
      <SidebarAdmin/>
      <div style={{ flex: 1, padding: "2rem" }}>
        
        <div style={{
          backgroundColor: "white",
          color: "#000",
          padding: "2rem",
          borderRadius: "15px",
          maxWidth: "600px",
          margin: "0 auto",
          marginTop: "10%",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
          <h2>Seleccione una opción para continuar</h2>
        </div>
      </div>
    </div>
  );
}
