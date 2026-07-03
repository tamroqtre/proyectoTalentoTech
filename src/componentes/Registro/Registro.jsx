import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/config";
import styles from '../Auth.module.css';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "usuarios", userCredential.user.uid), {
                email: email,
                rol: "user"
            });

            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?'
                );
                if (quiereLoguearse) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            }else{
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente');
                console.error("Erorr en el registro:", error.message);
            }
        }
    };
    return(
        <div className={styles.formContainer}>
            <h2>Crear nueva cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Correo electrónico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={styles.formGroup}>
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" />
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" className={styles.btnSubmit}>Registarse</button>
            </form>
        </div>
    );
};

export default Registro;