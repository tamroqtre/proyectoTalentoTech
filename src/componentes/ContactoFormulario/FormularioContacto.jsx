import styles from "./Contacto.module.css";
import React from "react";


export function FormularioContacto({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading}) {
  
    return (
        <form className={styles["form-container"]} onSubmit={manejarEnvio}>
            <h3>Contactanos</h3>
            <p className={styles.formSubtitle}>Dejanos tu consulta y el equipo de Akiba Crew te respondera pronto.</p>

            <div className={styles["form-group"]}>
                <label>Nombre y apellido</label>
                <input type="text" name="nombre" value={datosForm.nombre} onChange={manejarCambio} required />
            </div>

            <div className={styles["form-group"]}>
                <label>Email:</label>
                <input type="email" placeholder="Ej:ejemplo@correo.com" name="email" value={datosForm.email} onChange={manejarCambio} required/>
            </div>

            <div className={styles["form-group"]}>
                <label>Mensaje:</label>
                <textarea name="mensaje" value={datosForm.mensaje} onChange={manejarCambio} placeholder="Dejanos acá tu consulta. Máximo 300 caracteres" rows="6" maxLength={300} required />
            </div>
            
            
            <button type="submit" className={styles["btn-submit"]} disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer', backgroundColor: loading ? '#ccc' : '#f8bbd0'}}>{loading ? "Enviando..." : "Enviar mensaje✉️"}</button>
        </form>
    );
}