import SidebarCliente from "./SidebarCliente";

export default function LayoutCliente({ children }) {
  return (
    <div style={{ display: "flex", backgroundColor: "#246785" }}>
      <SidebarCliente />
      <div style={{ flex: 1, padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}
