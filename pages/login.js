import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import styles from '../styles/login.module.css';
import Router from 'next/router';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';


const STATE_INICIAL = {
  email: '',
  password: ''
}

export default function login() {

  const [errorUsuario, setErrorUsuario] = useState(false);

  const { valores, error, handleSubmit, handleChange} = useValidacion(STATE_INICIAL, validarIniciarSesion, IniciarSesion);
  const {email, password} = valores;

  async function IniciarSesion(){
    try {
      await firebase.login(email, password);
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario', error.message)
      setErrorUsuario(error.message)
    }
  }

  return (
    <div >
      <Layout>
        <div className={styles.contenedor}>
          <div className={styles.contenedor_formulario}>
            <h1 className={styles.h1}>Iniciar Sesion</h1>
            {error.general ? <p className={styles.error}>{error.general}</p> : null}
            {error.password ? <p className={styles.error}>{error.password}</p> : null}
            {errorUsuario ? <p className={styles.error}>{errorUsuario}</p> : null}
            <form
              onSubmit={handleSubmit}
            >
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
                  placeholder="Tu Contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.campo_formulario}>
                <input className={styles.btn1}
                  type="submit"
                  value="Iniciar Sesion"
                />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}