import React, { useEffect, useState } from "react";
import { ProductoList } from "./ProductoList";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export function ProductoContainer() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        /* fetch('/data/productos.json')
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
             }); */

        const productosRef = collection(db, "productos");

        getDocs(productosRef)
            .then((resp) => {
                const listaProductos = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                setProductos(listaProductos);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudo cargar la información desde Firebase");
            })
            .finally(() => {
                setCargando(false);
            })
    }, []);

    if (cargando) {
        return <p style={{ textAlign: 'center' }}>Cargando productos, por favor espere...</p>
    }
    if (error) {
        return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div style={{ width: '100%' }}>
            <ProductoList productos={productos} />
        </div>
    );
}
