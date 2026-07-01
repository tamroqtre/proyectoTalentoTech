import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ProductoDetalle.module.css";
import { useCart } from "../../Context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const { addToCart } = useCart();

    const incrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    useEffect(() => {
        /* fetch('/data/productos.json')
             .then(response => response.json())
             .then(data => {
                 const productoEncontrado = data.find(p => p.id === parseInt(id));
                 setProducto(productoEncontrado);
             })
             .catch(error => console.error("Erro al cargar el producto", error)); */

        if (id) {
            const docRef = doc(db, "productos", id);

            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) {
                        setProducto({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                        setProducto({ error: true});
                    }
                }).catch(error => console.log(error));
                setProducto({error: true});
        }

    }, [id]);



    if (!producto) {
        return <h2 style={{ textAlign: 'center' }}>Cargando detalle del producto...</h2>
    }

    if (producto.error) {
        return <h2 style={{ textAlign: 'center' }}>Producto no encontrado en la base de datos.</h2>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
            </div>
            <div className={styles.infoSection}>
                <h2 className={styles.title}>Detalle del producto: {producto.nombre}</h2>
                <h3 className={styles.price}>{new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(producto.precio)}</h3>
                <div className={styles.selectorCantidad}>
                    <button className={styles.botonPequeno} onClick={decrementar}>-</button>
                    <span className={styles.cantidadTexto} style={{ margin: '0 10px' }}>{cantidad}</span>
                    <button className={styles.botonPequeno} onClick={incrementar} disabled={cantidad >= producto.stock}>+</button>
                </div>
                <p className={styles.description}>{producto.descripcion}</p>
                <button className={styles.button} onClick={() => {
                    addToCart(producto, cantidad);
                    alert(`¡${producto.nombre} agregado al carrito! 🛒`);
                }}>
                    Agregar al carrito 🛒
                </button>
            </div>
        </div>
    )
}

export default ProductoDetalle