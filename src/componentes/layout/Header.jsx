import styles from './Layout.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../Contex/CartContext';
import CartWidget from '../Cart/CartWidget';
import { NavLink } from 'react-router-dom';

function Header() {

    return (
        <header className={styles.header}>
            <div className={styles["logo-wrapper"]}>
                <Link to="/" className={styles.logoLink}>
                <h1>Akiba Crew </h1>
                <img src="/images/logo2.png" alt="Logo Akiba Crew" className={styles["logo-img"]} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Inicio</NavLink>
                <NavLink to="/productos" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Productos</NavLink>
                <NavLink to="/contactanos" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Contactanos</NavLink>
                <CartWidget />
            </nav>
        </header>
    );
}

export default Header;