import { ProductoContainer } from "../producto/ProductoContainer";
import { useEffect, useState } from "react";
import { ProductoList } from "../producto/ProductoList";
import styles from './Layout.module.css'; 

const Inicio = () => {
    const [destacados, setDestacados] = useState([]);

    useEffect(()=> {
        fetch('/data/productos.json')
        .then(res => res.json())
        .then(data => {
            const aleatorios = data.sort(() => Math.random() - 0.5);
            const soloTres = aleatorios.slice(0,3);
            setDestacados(soloTres);
        })
        .catch(err => console.error(err));
    }, []);


    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ color: '#ff69b4' }}>✨ Bienvenidos a Akiba Crew ✨</h1>
            <p>Tu tienda favorita de figuras de anime y coleccionables.</p>
            
            <hr style={{ margin: '40px 0', border: '1px solid #eee', borderBottom: '2px solid black' }} />
            
            <h2 className={styles.destacados}>Productos Destacados</h2>
            <ProductoList productos={destacados} /> 
        </div>
    );
};

export default Inicio;