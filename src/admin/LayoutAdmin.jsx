import SidebarAdmin from "./components/SidebarAdmin";

export default function LayoutAdmin({ children }) {
  return (
    <div style={{ display: "flex", backgroundColor: "#1D6D8F", color: "black", minHeight: "100vh", height: "auto" }}>
      <SidebarAdmin/>
      <div style={{ flex: 1, padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}
