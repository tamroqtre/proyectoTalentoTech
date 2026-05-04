import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <main className={styles.mainContent}>
                { }
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;