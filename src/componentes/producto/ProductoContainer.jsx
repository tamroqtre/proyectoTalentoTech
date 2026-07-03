import React, { useEffect, useState } from "react";
import { ProductoList } from "./ProductoList";
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./ProductoContainer.module.css"

export function ProductoContainer() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const { categoria } = useParams();
    const [buscar, setBuscar] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 6


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

        setCargando(true);
        const productosRef = collection(db, "productos");

        const consultaFirebase = categoria
            ? query(productosRef, where("categoria", "==", categoria))
            : productosRef;

        getDocs(consultaFirebase)
            .then((resp) => {
                const listaProductos = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                setProductos(listaProductos);
                setPaginaActual(1);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudo cargar la información desde Firebase");
            })
            .finally(() => {
                setCargando(false);
            });
    }, [categoria]);

    const handleSearchChange = (e) => {
        setBuscar(e.target.value);
        setPaginaActual(1);
    }

    if (cargando) {
        return <p className={styles.loading}>Cargando productos, por favor espere...</p>
    }
    if (error) {
        return <p className={styles.error}>Error: {error}</p>;
    }

    const productosFiltrados = productos.filter((prod) =>
        prod.nombre.toLowerCase().includes(buscar.toLocaleLowerCase())
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

    const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);


    return (
        <div className={styles.container}> 
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="🔍 Buscar producto por nombre..."
                    value={buscar}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>

            <h2 className={styles.title}>
                {categoria ? `Sección: ${categoria}` : "Todos nuestros productos"}
            </h2>

            {productosPaginados.length > 0 ? (
                <ProductoList productos={productosPaginados} />
            ) : (
                <p className={styles.noProducts}>
                    No se encontraron productos que coincidan con tu búsqueda. 😢
                </p>
            )}

            {totalPaginas > 1 && (
                <div className={styles.paginationContainer}>
                    <button
                        onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                        disabled={paginaActual === 1}
                        className={styles.paginationButton}
                    >
                        Anterior
                    </button>

                    <span className={styles.paginationText}>
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <button
                        onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                        disabled={paginaActual === totalPaginas}
                        className={styles.paginationButton}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
