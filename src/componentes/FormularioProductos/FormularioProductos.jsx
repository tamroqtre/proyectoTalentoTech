import styles from "./Formulario.module.css";
import React from "react";


export function FormularioProducto({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading}) {
  
    return (
        <form className={styles["form-container"]} onSubmit={manejarEnvio}>
            <h3>Agregar nuevo producto</h3>
            <div className={styles["form-group"]}>
                <label>Nombre del producto:</label>
                <input type="text" placeholder="Ej: Banpresto Tokito" name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
            </div>
            <div className={styles["form-group"]}>
                <label>Precio:</label>
                <input type="number" placeholder="Ej: 200.000" name="precio" value={datosForm.precio} onChange={manejarCambio} />
            </div>
            <div className={styles["form-group"]}>
                <label>Stock:</label>
                <input type="number" placeholder="Ej: 5" name="stock" value={datosForm.stock} onChange={manejarCambio} />
            </div>
            <div className={styles["form-group"]}>
                <label>Imagen:</label>
                <input type="file" placeholder="https://..." name="imagen" onChange={manejarCambioImagen} />
            </div>
            <button type="submit" className={styles["btn-submit"]} disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer', backgroundColor: loading ? '#ccc' : '#f8bbd0'}}>{loading ? "Cargando producto..." : "Cargar producto"}</button>
        </form>
    );
}