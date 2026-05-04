import styles from './Footer.module.css'

function TarjetaUsuario({ nombre, descripcion, imagen }) {
    return (
        <div className={styles.tarjeta}>
            <img src={imagen} alt={nombre} className={styles.avatar} />
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
        </div>
    )
}

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.infoEmpresa}>
                <h2>Akiba Crew</h2>
                <p>Tu rincón de anime y figuras coleccionables en Buenos Aires.</p>
                <p>© 2026 - Todos los derechos reservados.</p>
            </div>

            <div className={styles.contenedorTarjetas}>
                <TarjetaUsuario 
                    nombre="Tam" 
                    descripcion="Editora & Frontend Developer. Fan de Kimetsu." 
                    imagen="/images/avatar1.jpg" 
                />
                <TarjetaUsuario 
                    nombre="Ema" 
                    descripcion="QA Analyst & Especialista en Shonen." 
                    imagen="/images/avatar2.jpg" 
                />
                <TarjetaUsuario 
                    nombre="Flor" 
                    descripcion="Community Manager & Coleccionista de Banpresto." 
                    imagen="/images/avatar3.png" 
                />
            </div>
        </footer>
    );
};

export default Footer;