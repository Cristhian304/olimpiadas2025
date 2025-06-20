import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function FormularioPaquete() {
  const location = useLocation();
  const paqueteEditar = location.state?.paquete;

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [ubicacion, setHotel] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (paqueteEditar) {
      setNombre(paqueteEditar.nombre);
      setTipo(paqueteEditar.tipo);
      setPrecio(paqueteEditar.precio);
      setCapacidad(paqueteEditar.capacidad);
      setHotel(paqueteEditar.hotel);
      setCategoria(paqueteEditar.categoria);
      setDescripcion(paqueteEditar.descripcion);
    }
  }, [paqueteEditar]);

  return (
    <div>
      {/* formulario con los valores actuales de los estados */}
    </div>
  );
}

export default FormularioPaquete;
