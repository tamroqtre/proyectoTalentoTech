import React from "react";
import { useCart } from "../../Contex/CartContext";
import styles from "./Cart.module.css"
import { Link } from 'react-router-dom'

const Cart = () => {

    const { cart, clearCart, getCartTotal, updateQuantity, removeItem } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continar con la compra.</p>
                <Link to="/productos" className="btn-volver"> Ver productos </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                        <h3>{item.nombre}</h3>
                        <div className={styles.quantityControls}>
                            <button className={styles.qtyButton} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <span span className={styles.qtyNumber}>{item.quantity}</span>
                            <button className={styles.qtyButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio unitario: ${item.precio}</p>
                    </div>
                    <div className={styles.priceInfo}>
                        <p className={styles.subtotal}>Subtotal: ${item.precio * item.quantity}</p>
                        <button className={styles.deleteButton} 
                            onClick={() => removeItem(item.id)}>
                            Eliminar 🗑️
                        </button>
                    </div>
                </div>
            ))}
            <hr />
            <div className={styles.totalSection}>
                <p className={styles.totalText}>Total a pagar: ${getCartTotal()}</p>
                <div>
                    <button className={styles.clearButton} onClick={clearCart}>Vaciar carrito</button>
                    <Link to="/" onClick={()=> {alert("Gracias por tu compra en Akiba Crew"); clearCart();}} className={styles.checkoutButton}>Finalziar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
