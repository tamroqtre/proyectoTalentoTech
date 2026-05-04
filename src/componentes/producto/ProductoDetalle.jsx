import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ProductoDetalle.module.css";

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Erro al cargar el producto", error));
    }, [id]);

    if (!producto) {
        return <h2 style={{ textAlign: 'center' }}>Producto no encontrado o cargando...</h2>
    }

    if (!producto.id) {
        return <h2 style={{ textAlign: 'center' }}>Producto no encontrado.</h2>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
            </div>
            <div className={styles.infoSection}>
                <h2 className={styles.title}>Detalle del producto: {producto.nombre}</h2>
                <h3 className={styles.price}>${producto.precio}</h3>
                <p className={styles.description}>{producto.descripcion}</p>
                <button className={styles.button}>
                    Agregar al carrito 🛒
                </button>
            </div>
        </div>
    )
}

export default ProductoDetalle