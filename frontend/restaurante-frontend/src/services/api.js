const API_URL = "http://127.0.0.1:8000/api/platillos/";

export async function obtenerPlatillos() {
    const response = await fetch(API_URL);
    return await response.json();
}

export async function obtenerPlatillo(id) {
    const response = await fetch(`${API_URL}${id}/`);
    return await response.json();
}

export async function agregarPlatillo(platillo) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(platillo),
    });

    return await response.json();
}

export async function editarPlatillo(id, platillo) {
    const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(platillo),
    });

    return await response.json();
}

export async function eliminarPlatillo(id) {
    await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
    });
}

export async function cambiarDisponibilidad(id, disponible) {
    const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            disponible: disponible,
        }),
    });

    return await response.json();
}