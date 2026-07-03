import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ProductoDetalle.module.css";
import { useCart } from "../../Context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [esFavorito, setEsFavorito] = useState(false);

    const { addToCart, getCurrentQuantity } = useCart();

    const cantidadActualEnCarrito = producto ? getCurrentQuantity(producto.id) : 0;
    const stockDisponibleEfectivo = producto ? (producto.stock - cantidadActualEnCarrito) : 0;

    const incrementar = () => {
        if (cantidad < stockDisponibleEfectivo) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const marcarComoFavotiro = () => {
        setEsFavorito(!esFavorito);
    }

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
                        setProducto({ error: true });
                    }
                }).catch(error => console.log(error));
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 className={styles.title}>Detalle del producto: {producto.nombre}</h2>
                    <span onClick={marcarComoFavotiro} style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: esFavorito ? '#ff28df' : '#767676', fontSize: '30px',
                        transition: 'transform 0.2s ease, color 0.2s ease'
                    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        {esFavorito ? <AiFillHeart /> : <AiOutlineHeart />}
                    </span>
                </div>

                <h3 className={styles.price}>{new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(producto.precio)}</h3>


                <div className={styles.infoExtra}>
                    <span className={styles.badgeCategoria}>
                        Categoría: {producto.categoria}
                    </span>

                    <span className={producto.stock > 0 ? styles.badgeStock : styles.badgeSinStock}>
                        Stock: {producto.stock}
                    </span>
                </div>

                <div className={styles.selectorCantidad}>
                    <button className={styles.botonPequeno} onClick={decrementar} disabled={cantidad === 1}>-</button>
                    <span className={styles.cantidadTexto} style={{ margin: '0 10px' }}>{cantidad}</span>
                    <button className={styles.botonPequeno} onClick={incrementar} disabled={cantidad >= stockDisponibleEfectivo}>+</button>
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