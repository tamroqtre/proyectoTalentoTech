import React, { useState } from "react";
import { FormularioContacto } from "./FormularioContacto";



export function ContactoContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });

    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm, [name]: value
        });
    };

    
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setLoading(true);

        try {
            console.log("Datos enviados:", datosForm);
            
            setTimeout(() => {
                alert(`¡Gracias ${datosForm.nombre}! Tu mensaje ha sido enviado con éxtio.`)
                setDatosForm({nombre:'', email:'', mensaje:''});
                setLoading(false);
            }, 1500)

        }
        catch (error) {
            console.error("Error al enviar:", error);
            alert("Hubo un problema. Por favor intente de nuevo.");
            setLoading(false);
        }
    };


    return (
        <FormularioContacto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            loading={loading}
        />
    );
}
