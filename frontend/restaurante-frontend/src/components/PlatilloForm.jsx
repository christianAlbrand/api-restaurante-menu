import { useEffect, useState } from "react";
import "./PlatilloForm.css";

function PlatilloForm({ onGuardar, platilloEditar }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen_url, setImagen] = useState("");
    const [disponible, setDisponible] = useState(true);

    useEffect(() => {
        if (platilloEditar) {
            setNombre(platilloEditar.nombre);
            setDescripcion(platilloEditar.descripcion);
            setCategoria(platilloEditar.categoria);
            setPrecio(platilloEditar.precio);
            setImagen(platilloEditar.imagen_url);
            setDisponible(platilloEditar.disponible);
        }
    }, [platilloEditar]);

    function enviarFormulario(e) {
        e.preventDefault();

        onGuardar({
            id: platilloEditar?.id,
            nombre,
            descripcion,
            categoria,
            precio,
            imagen_url,
            disponible
        });

        if (!platilloEditar) {
            setNombre("");
            setDescripcion("");
            setCategoria("");
            setPrecio("");
            setImagen("");
            setDisponible(true);
        }
    }

    return (
        <form className="platillo-form" onSubmit={enviarFormulario}>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
            />

            <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="URL de la imagen"
                value={imagen_url}
                onChange={(e) => setImagen(e.target.value)}
            />

            <label>
                Disponible
                <input
                    type="checkbox"
                    checked={disponible}
                    onChange={(e) => setDisponible(e.target.checked)}
                />
            </label>

            <button type="submit">
                {platilloEditar ? "Actualizar" : "Agregar"}
            </button>

        </form>
    );
}

export default PlatilloForm;