import React, { useState } from "react";
import { FormularioProducto } from "./FormularioAltaProductos";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export function AltaProductosContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        categoria: '',
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

        setLoading(true);

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
                console.log('Imagen subida con éxito:', datosImgbb.data.url);
                
                const nuevoProducto = {
                    nombre: datosForm.nombre,
                    precio: Number(datosForm.precio),
                    stock: Number(datosForm.stock),
                    descripcion: datosForm.descripcion,
                    imagen: datosImgbb.data.url,
                    categoria: datosForm.categoria
                };

                const productosRef = collection(db, "productos");

                const docRef = await addDoc(productosRef, nuevoProducto);
                
                console.log("Producto guardado en Firestore con ID:", docRef.id);
                alert("Producto creado y subido con éxito!")

                setDatosForm({ nombre:'', precio:'', stock:'', categoria:'', descripcion:''});
                setImagenFile(null);
                evento.target.reset();
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
