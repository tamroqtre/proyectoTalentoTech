import styles from './TarjetaProducto.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function TarjetaProducto({ id, imagen, nombre, precio, stock, categoria, descripcion }) {

    const producto = { id, nombre, precio, stock, imagen, categoria, descripcion };
    const { addToCart, getCurrentQuantity, isInCart } = useCart();
    const [cantidad, setCantidad] = useState(0);
    const [esFavorito, setEsFavorito] = useState(false);

    const yaEstaEnCarrito = isInCart(id);
    const cantidadActualEnCarrito = getCurrentQuantity(id);
    const stockDisponibleEfectivo = stock - cantidadActualEnCarrito;

    const incrementar = () => {
        if (cantidad < stockDisponibleEfectivo) {
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
        if (cantidad > 0) {
            addToCart(producto, cantidad);
            alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`)
        }
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

            <p className={styles.cardPrice}>{new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 0
            }).format(precio)}</p>

            <div className={styles.infoBadges}>
                <span className={styles.badgeCategoria}>
                    {categoria}
                </span>

                <span className={stock > 0 ? styles.badgeStock : styles.badgeSinStock}>
                    Stock: {stock}
                </span>
            </div>

            {yaEstaEnCarrito && (
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>
                    Ya tienes {cantidadActualEnCarrito} en el carrito
                </p>
            )}

            <div className={styles.selectorCantidad}>
                <button className={styles.botonPequeno} onClick={decrementar} disabled={cantidad === 0}>-</button>
                <span className={styles.cantidadTexto} style={{ margin: '0 10px' }}>{cantidad}</span>
                <button className={styles.botonPequeno} onClick={incrementar} disabled={cantidad >= stockDisponibleEfectivo}>+</button>
            </div>

            {stockDisponibleEfectivo === 0 ? (
                <button className={styles.botonAgregar} disabled style={{ backgroundColor: '#ccc' }}>
                    Sin stock disponible
                </button>
            ) : (
                <button
                    className={styles.botonAgregar}
                    onClick={handleAddToCart}
                    disabled={cantidad === 0}
                >
                    {yaEstaEnCarrito ? 'Agregar más' : 'Agregar al carrito'}
                </button>
            )}

            {yaEstaEnCarrito && (
                <Link to="/carrito" className={styles.botonIrAlCarrito} style={{ marginTop: '10px', display: 'block' }}>
                    Ver en el carrito ✅
                </Link>
            )}
        </div>
    );
}

export default TarjetaProducto;