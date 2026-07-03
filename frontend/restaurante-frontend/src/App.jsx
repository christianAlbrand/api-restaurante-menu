import { useEffect, useState } from "react";
import "./App.css";

import PlatilloCard from "./components/PlatilloCard";
import PlatilloForm from "./components/PlatilloForm";

import {
  obtenerPlatillos,
  agregarPlatillo,
  editarPlatillo,
  eliminarPlatillo,
  cambiarDisponibilidad,
} from "./services/api";

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [platilloEditar, setPlatilloEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  async function cargarPlatillos() {
    try {
      const datos = await obtenerPlatillos();
      setPlatillos(datos);
    } catch (error) {
      console.error("Error al cargar los platillos:", error);
    }
  }

  function resetearFormulario() {
    setPlatilloEditar(null);
  }

  useEffect(() => {
    cargarPlatillos();
  }, []);

  async function guardarPlatillo(platillo) {
    try {
      if (platillo.id) {
        await editarPlatillo(platillo.id, platillo);
        alert("Platillo actualizado correctamente.");
      } else {
        await agregarPlatillo(platillo);
        alert("Platillo agregado correctamente.");
        resetearFormulario();
      }

      setPlatilloEditar(null);
      cargarPlatillos();
    } catch (error) {
      alert("Ocurrió un error al guardar el platillo.");
    }
  }

  async function eliminar(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este platillo?"
    );

    if (!confirmar) return;

    try {
      await eliminarPlatillo(id);
      alert("Platillo eliminado.");
      cargarPlatillos();
    } catch (error) {
      alert("No se pudo eliminar.");
    }
  }

  async function cambiar(id, disponible) {
    try {
      await cambiarDisponibilidad(id, disponible);
      cargarPlatillos();
    } catch (error) {
      alert("No se pudo cambiar la disponibilidad.");
    }
  }

  const platillosFiltrados = platillos.filter((platillo) => {
    const coincideNombre = platillo.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    
    const coincideCategoria = categoriaSeleccionada === "" || platillo.categoria === categoriaSeleccionada;

    const coincideDisponibilidad =
      !soloDisponibles || platillo.disponible;

    return coincideNombre && coincideCategoria && coincideDisponibilidad;
  });

  return (
    <div className="App">
      <h1>Menú del Restaurante</h1>

      <PlatilloForm
        onGuardar={guardarPlatillo}
        platilloEditar={platilloEditar}
      />

      <br />

      <div className="barra">

          <input
              type="text"
              placeholder="Buscar platillo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
              <option value="">Todas las categorías</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Costillas">Costillas</option>
              <option value="Burros">Burros</option>
          </select>

          <label>
              <input
                  type="checkbox"
                  checked={soloDisponibles}
                  onChange={(e) => setSoloDisponibles(e.target.checked)}
              />
              Solo disponibles
          </label>

          <div className="total">
              Total: <strong>{platillosFiltrados.length}</strong>
          </div>

      </div>

      <div className="contenedor-platillos">
        {platillosFiltrados.map((platillo) => (
          <PlatilloCard
            key={platillo.id}
            platillo={platillo}
            onEdit={setPlatilloEditar}
            onDelete={eliminar}
            onChangeAvailability={cambiar}
          />
        ))}
      </div>
    </div>
  );
}

export default App;