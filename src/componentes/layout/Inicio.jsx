import { useEffect, useState } from "react";
import { ProductoList } from "../producto/ProductoList";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import styles from './Layout.module.css';

const Inicio = () => {
    const [destacados, setDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const productosRef = collection(db, "productos");

        getDocs(productosRef)
            .then((resp) => {
                const listaProductos = resp.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const aleatorios = listaProductos.sort(() => Math.random() - 0.5);
                const soloTres = aleatorios.slice(0, 3);

                setDestacados(soloTres);
            })
            .catch((err) => {
                console.error("Error al traer los destacados de Firebase:", err);
            })
            .finally(() => {
                setCargando(false);
            });

        /* Sort para productos json 
        
        fetch('/data/productos.json')
         .then(res => res.json())
         .then(data => {
             const aleatorios = data.sort(() => Math.random() - 0.5);
             const soloTres = aleatorios.slice(0,3);
             setDestacados(soloTres);
         })
         .catch(err => console.error(err)); */
    }, []);


    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ color: '#ff69b4' }}>✨ Bienvenidos a Akiba Crew ✨</h1>
            <p>Tu tienda favorita de figuras de anime y coleccionables.</p>

            <hr style={{ margin: '40px 0', border: '1px solid #eee', borderBottom: '2px solid black' }} />

            <h2 className={styles.destacados}>Productos Destacados</h2>

        {/* De productos json.
        
        <ProductoList productos={destacados} /> */}

            {cargando ? (
                <p style={{ color: '#7904bd' }}>Buscando las mejores figuras para vos...</p>
            ) : (
                <ProductoList productos={destacados} /> 
            )}
        </div>
    );
};

export default Inicio;