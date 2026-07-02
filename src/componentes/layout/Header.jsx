import styles from './Layout.module.css'
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import CartWidget from '../Cart/CartWidget';
import { useAuth } from '../../Context/AuthContext';
import { useState } from 'react';

function Header() {

    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles["logo-wrapper"]}>
                <button className={styles.hamburgerBtn} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <Link to="/" className={styles.logoLink}>
                    <h1>Akiba Crew </h1>
                    <img src="/images/logo2.png" alt="Logo Akiba Crew" className={styles["logo-img"]} />
                </Link>
            </div>

            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>

                <NavLink to="/" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Inicio</NavLink>

                <NavLink to="/productos" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Productos</NavLink>

                <NavLink to="/contactanos" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Contactanos</NavLink>
                <CartWidget />

                {user ? (
                    <>
                        {/* Mostrar Gestión SOLO si el usuario está logueado Y es admin */}
                        {user.rol === 'admin' && (
                            <NavLink to="/gestion" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Gestión</NavLink>
                        )}
                        <span className={styles["user-email"]}>¡Hola, {user.email}!</span>
                        <button onClick={logout} className={styles["btn-logout"]}>Cerrar Sesión</button>
                    </>
                ) : (
                    /* Si no hay usuario, mostramos el enlace para iniciar sesión */
                    <NavLink to="/login" className={({ isActive }) => isActive ? styles["link-activo"] : styles["link-normal"]}>Login</NavLink>
                )}
            </nav>
        </header>
    );
}

export default Header;