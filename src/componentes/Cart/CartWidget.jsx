import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import styles from './Cart.module.css';

const CartWidget = () => {
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <div className={styles.containerPrincipal}>
            <Link to="/carrito" className={styles.widgetContainer}>
                <span className={styles.icon}>🛒</span>
                <span className={styles.badge}>{totalItems}</span>
            </Link>
        </div>
    )
}

export default CartWidget