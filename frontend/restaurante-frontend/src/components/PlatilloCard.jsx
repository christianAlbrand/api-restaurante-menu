import "./PlatilloCard.css";

function PlatilloCard({
    platillo,
    onEdit,
    onDelete,
    onChangeAvailability
}) {
    return (
        <div className="platillo-card">

            {platillo.imagen_url && (
                <img
                    src={platillo.imagen_url}
                    alt={platillo.nombre}
                    className="platillo-imagen"
                />
            )}

            <div className="platillo-info">

                <h2>{platillo.nombre}</h2>

                <p>
                    <strong>Categoría:</strong> {platillo.categoria}
                </p>

                <p>
                    <strong>Precio:</strong> ${platillo.precio}
                </p>

                <p>{platillo.descripcion}</p>

                <p>
                    <strong>Disponible:</strong>{" "}
                    {platillo.disponible ? "Sí" : "No"}
                </p>

                <div className="botones">

                    <button
                        onClick={() => onEdit(platillo)}
                    >
                        Editar
                    </button>

                    <button
                        onClick={() => onDelete(platillo.id)}
                    >
                        Borrar
                    </button>

                    <button
                        onClick={() =>
                            onChangeAvailability(
                                platillo.id,
                                !platillo.disponible
                            )
                        }
                    >
                        Cambiar Disponibilidad
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PlatilloCard;