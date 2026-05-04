import styles from './Layout.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../Contex/CartContext';
import CartWidget from '../Cart/CartWidget';

function Header() {

    return (
        <header className={styles.header}>
            <div className={styles["logo-wrapper"]}>
                <h1>Akiba Crew </h1>
                <img src="/images/logo2.png" alt="Logo Akiba Crew" className={styles["logo-img"]} />
            </div>
            <nav className={styles.nav}>
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/contactanos">Contactanos</Link>
                <CartWidget />
            </nav>
        </header>
    );
}

export default Header;