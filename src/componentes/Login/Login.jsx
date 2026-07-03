import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Auth.module.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };
    return (
        <div className={styles.formContainer}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={(handleLogin)}>
                <div className={styles.formGroup}>
                    <label>Correo electrónico</label>
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className={styles.formGroup}>
                    <label>Contraseña</label>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <button type="submit" className={styles.btnSubmit}>Ingresar</button>
            </form>
            <p className={styles.redirectText}> ¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>
        </div>
    );
}

export default Login;