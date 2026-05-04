import React, { useEffect, useState } from "react";
import { ProductoList } from "./ProductoList";
import { Link } from 'react-router-dom';

export function ProductoContainer() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p style={{ textAlign: 'center' }}>Cargando productos, por favor espere...</p>
    }
    if (error) {
        return <p style={{ textAlign: 'center', color:'red' }}>Error: {error}</p>;
    }

    return (
        <div style={{ width: '100%' }}>
            <ProductoList productos={productos} />
        </div>
    );
}
