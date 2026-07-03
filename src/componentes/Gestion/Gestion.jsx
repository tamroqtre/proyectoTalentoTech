import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore";
import { FormularioProducto } from "../FormularioProductos/FormularioAltaProductos";
import styles from "./Gestion.module.css"

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [productosAEditar, setProductosAEditar] = useState(null);
    const [imagenFile, setImagenFile] = useState(null);

    const estadoInicialForm = {
        nombre: "",
        precio: "",
        stock: "",
        descripcion: "",
        imagen: "",
        categoria: "",
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos");
            const resp = await getDocs(productosRef);

            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        if (productosAEditar) {
            setDatosForm(productosAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productosAEditar]);

    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        if (evento.target.files && evento.target.files[0]) {
            setImagenFile(evento.target.files[0]);
        }
    };

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };


    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setLoading(true);

        try {
            let urlImagen = datosForm.imagen;

            if (imagenFile) {
                const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
                const formData = new FormData();
                formData.append('image', imagenFile);

                console.log("Subiendo nueva imagen a Imgbb...");

                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const datosImgbb = await respuestaImgbb.json();

                if (datosImgbb.success) {
                    urlImagen = datosImgbb.data.url;
                } else {
                    throw new Error("Error al subir la imagen a Imgbb");
                }
            }

            const productoData = {
                nombre: datosForm.nombre,
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                descripcion: datosForm.descripcion || "",
                imagen: urlImagen,
                categoria: datosForm.categoria
            };

            if (productosAEditar) {

                const docRef = doc(db, "productos", productosAEditar.id);
                await updateDoc(docRef, productoData);

                alert("¡Producto editado con éxito!");

                setProductosAEditar(null);
            } else {

                if (!imagenFile) {
                    alert("La imagen es obligatoria para un producto nuevo.");
                    setLoading(false);
                    return;
                }

                const productosRef = collection(db, "productos");
                await addDoc(productosRef, productoData);
                alert("¡Producto creado con éxito! ✨");
            }

            setDatosForm(estadoInicialForm);
            setImagenFile(null);
            evento.target.reset();
        } catch (error) {
            console.error("Hubo un problema al procesar el envío:", error);
            alert("Hubo un error al procesar el formulario. Revisá la consola.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (producto) => {
        setProductosAEditar(producto);
    };

    const cancelarEdicion = () => {
        setProductosAEditar(null);
        setImagenFile(null);
    };

    return (
        <div className={styles.adminContainer}>
            <h2 className={styles.mainTitle}>Panel de Control Akiba Crew 🛠️</h2>


            <div className={styles.dashboardLayout}>
                {/* Columna Izquierda: Formulario */}
                <div className={styles.formSection}>
                    <div className={styles.cardHeader}>
                        {productosAEditar ? "📝 Editando Producto" : "➕ Añadir Producto Nuevo"}
                    </div>
                    <FormularioProducto
                        datosForm={datosForm}
                        manejarCambio={manejarCambio}
                        manejarEnvio={manejarEnvio}
                        manejarCambioImagen={manejarCambioImagen}
                        modoEdicion={!!productosAEditar}
                        loading={loading}
                    />
                    {productosAEditar && (
                        <button onClick={cancelarEdicion} className={styles.btnCancelGlobal}>
                            Cancelar Edición
                        </button>
                    )}
                </div>

                {/* Columna Derecha: Lista de productos existentes */}
                <div className={styles.listSection}>
                    <h3 className={styles.sectionTitle}>Productos en Stock ({productos.length})</h3>
                    <div className={styles.productosGrid}>
                        {productos.map((prod) => (
                            <div key={prod.id} className={styles.productoRow}>
                                <img src={prod.imagen} alt={prod.nombre} className={styles.miniPreview} />

                                <div className={styles.productoMeta}>
                                    <h4>{prod.nombre}</h4>
                                    <div className={styles.badges}>
                                        <span className={styles.badgePrecio}>${prod.precio}</span>
                                        <span className={`${styles.badgeStock} ${prod.stock === 0 ? styles.noStock : ''}`}>
                                            Stock: {prod.stock}
                                        </span>
                                        <span className={styles.badgeCategoria}>{prod.categoria?.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className={styles.accionesAdmin}>
                                    <button
                                        onClick={() => handleEditClick(prod)}
                                        className={styles.btnEditar}
                                        title="Editar producto"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prod.id)}
                                        className={styles.btnEliminar}
                                        title="Eliminar producto"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gestion;