import styles from "./AltaProductos.module.css";
import React from "react";
import { Link } from "react-router-dom";


export function FormularioProducto({ datosForm, manejarCambioImagen, manejarCambio, manejarEnvio, modoEdicion, loading }) {

    return (
        <form className={styles["form-container"]} onSubmit={manejarEnvio}>
            <h3>{modoEdicion ? "Editar producto" : "Agregar nuevo producto"}</h3>

            <div className={styles["form-group"]}>
                <label>Nombre del producto:</label>
                <input type="text" placeholder="Ej: Banpresto Tokito" name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
            </div>

            <div className={styles["form-group"]}>
                <label>Precio:</label>
                <input type="number" placeholder="Ej: 195800" name="precio" value={datosForm.precio} onChange={manejarCambio} />
            </div>

            <div className={styles["form-group"]}>
                <label>Stock:</label>
                <input type="number" placeholder="Ej: 5" name="stock" value={datosForm.stock} onChange={manejarCambio}/>
            </div>

            <div className={styles["form-group"]}>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    placeholder="Ej: Figura a escala de 17cm con base incluida..."
                    value={datosForm.descripcion || ""}
                    onChange={manejarCambio}
                    rows="4"
                />
            </div>

            <div className={styles["form-group"]}>
                <label>Imagen:</label>
                <input type="file" placeholder="https://..." name="imagen" onChange={manejarCambioImagen} required={!modoEdicion}/>
            </div>

            <div className={styles["form-group"]}>
                <label>Categoria:</label>
                <select
                    name="categoria" value={datosForm.categoria || ""} onChange={manejarCambio} required>

                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="cd">CD</option>
                    <option value="figuras">Figuras</option>
                    <option value="peluches">Peluches</option>
                    <option value="colecciones">Colecciones</option>

                </select>
            </div>

            <button type="submit" className={styles["btn-submit"]} disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer', backgroundColor: loading ? '#ccc' : '#f8bbd0' }}>{loading ? "Guardando..." : (modoEdicion ? "Guardar cambios" : "Cargar producto")}</button>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <Link to="/" className={styles["link-volver"]} style={{ textDecoration: "none", color: "#4a148c", fontWeight: "600" }}>
                    ← Volver al inicio
                </Link>
            </div>
        </form>
    );
}