import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import styles from '../styles/login.module.css';
import Router from 'next/router';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';



const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

export default function crearCuenta() {

  const [errorUsuario, setErrorUsuario] = useState(false);

  const { valores, error, handleSubmit, handleChange} = useValidacion(STATE_INICIAL, validarCrearCuenta, cuentaCreada);
  const {nombre, email, password} = valores;

  async function cuentaCreada(){
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message)
      setErrorUsuario(error.message)
    }
  }
  

  return (
    <div >
      <Layout>
        <div className={styles.contenedor}>
          <div className={styles.contenedor_formulario}>
            <h1 className={styles.h1}>Crear Una Cuenta</h1>
            {error.general ? <p className={styles.error}>{error.general}</p> : null}
            {error.password ? <p className={styles.error}>{error.password}</p> : null}
            {errorUsuario ? <p className={styles.error}>{errorUsuario}</p> : null}
            <form
              onSubmit={handleSubmit}
            >
              <div className={styles.campo_formulario}>
                <label htmlFor="nombre" className={styles.label}>Nombre</label>
                <input 
                  className={styles.input}
                  type="text"
                  id="nombre"
                  placeholder="Tu Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.campo_formulario}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  autoComplete="username"
                  placeholder="correo@correo.com"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.campo_formulario}>
                <label htmlFor="password" className={styles.label}>Contraseña</label>
                <input 
                  className={styles.input}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Nueva Contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.campo_formulario}>
                <input className={styles.btn1}
                  type="submit"
                  value="Crear Cuenta"
                />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}