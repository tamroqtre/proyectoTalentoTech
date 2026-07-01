import styles from './TarjetaProducto.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext'

function TarjetaProducto({ id, imagen, nombre, precio, stock }) {

    const producto = { id, nombre, precio, stock, imagen };
    const { addToCart, getCurrentQuantity, isInCart } = useCart();
    const [cantidad, setCantidad] = useState(0);
    const [esFavorito, setEsFavorito] = useState(false);


    const cantidadActual = getCurrentQuantity(producto.id);
    const yaEstaEnCarrito = isInCart(id);

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad >= 1) {
            setCantidad(cantidad - 1);
        }
    };

    const marcarComoFavotiro = () => {
        setEsFavorito(!esFavorito);
    }

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`)
    };

    return (
        <div className={styles.card}>
            <Link to={`/producto/${id}`}>
                <img src={imagen} alt={nombre} className={styles.image} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                <Link to={`/producto/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className={styles.cardTitle}>{nombre}</h3>
                </Link>
                <span onClick={marcarComoFavotiro} style={{ cursor: 'pointer' }}>
                    {esFavorito ? '⭐' : '☆'}
                </span>
            </div>

            <p className={styles.cardPrice}>{new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 0
            }).format(precio)}</p>
            <div className={styles.selectorCantidad}>
                <button className={styles.botonPequeno} onClick={decrementar}>-</button>
                <span className={styles.cantidadTexto} style={{ margin: '0 10px' }}>{cantidad}</span>
                <button className={styles.botonPequeno} onClick={incrementar} disabled={cantidad >= stock}>+</button>
            </div>

            {yaEstaEnCarrito ? (
                <Link to="/carrito" className={styles.botonIrAlCarrito}>
                    Ver en el carrito ✅
                </Link>) : (<button className={styles.botonAgregar} onClick={handleAddToCart} disabled={cantidad === 0} >
                    Agregar al carrito
                </button>)}
        </div>
    );
}

export default TarjetaProducto;