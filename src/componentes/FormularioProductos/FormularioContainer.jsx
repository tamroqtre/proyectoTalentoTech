import React, { useState } from "react";
import { FormularioProducto } from "./FormularioProductos";



export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
    });
    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm, [name]: value
        });
    };
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };
    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!imagenFile) {
            alert("La imagen es obligatoria.")
            return;
        }

        const apiKey = '22d16147610632b5b736b8744d067764';
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
            fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log('Producto completo:', { ...datosForm, urlImagen: datosImgbb.data.url });
                alert("¡Producto cargado con éxito!");
            }

        }
        catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir el archivo. Por favor intenta de nuevo.");
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loading}
        />
    );
}
