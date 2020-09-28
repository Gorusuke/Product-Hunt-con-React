import React, {useState, useContext} from 'react';
import Layout from '../components/layout/Layout';
import styles from '../styles/login.module.css';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import 'firebase/storage' // no funciono con firebase.storage
import app from 'firebase/app'; // no funciono con firebase.storage


import {FirebaseContext} from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarNuevoProducto from '../validacion/validarNuevoProducto';
import Error404 from '../components/layout/404';



const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: ''
}


export default function nuevoProducto() {

  // States de las imagenes(FileUploader)
  const [imagenes, setImagenes] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState('')

  const [errorUsuario, setErrorUsuario] = useState(false);

  const { valores, error, handleSubmit, handleChange} = useValidacion(STATE_INICIAL, validarNuevoProducto, crearProducto);
  const {nombre, empresa, imagen, url, descripcion} = valores;

  // Hook de router para redireccionar
  const router = useRouter();

  // Context con las operaciones crud de firebase(funcionalidades para crear los productos)
  const {usuario, firebase} = useContext(FirebaseContext); //esto es el return que esta en el _app que equivale a context de firebase

  async function crearProducto(){
    // si el usuario esta autenticado llevar al login
    if(!usuario){
      return router.push('/login')
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    // Insertarlo en una base de datos
    firebase.db.collection("productos").add(producto); // Aqui no se porque funciono

    return router.push('/')
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  }

  const handleProgress = (progreso) => setProgreso({progreso});
  
  const handleUploadError = (error) => {
    setSubiendo(error);
    console.info(error);
  }

  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false)
    setImagenes(nombre)
    // firebase (no funciono con firebase e importe el app y el storage y lo hice directo)
    app
      .storage()
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        setUrlImagen(url)
      })
  }


  return (
    <div >
      <Layout>
        {!usuario ? <Error404/> : (
        <div className={styles.contenedor}>
          <div className={styles.contenedor_formulario}>
            <h1 className={styles.h1}>Nuevo Producto</h1>
            {error.general ? <p className={styles.error}>{error.general}</p> : null}
            {error.password ? <p className={styles.error}>{error.password}</p> : null}
            {errorUsuario ? <p className={styles.error}>{errorUsuario}</p> : null}
            <form
              onSubmit={handleSubmit}
            >
              <fieldset className={styles.fieldset}>
                <legend>Informacion General</legend>
                <div className={styles.campo_formulario}>
                  <label htmlFor="nombre" className={styles.label}>Nombre</label>
                  <input 
                    className={styles.input}
                    type="text"
                    id="nombre"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.campo_formulario}>
                  <label htmlFor="empresa" className={styles.label}>Empresa</label>
                  <input 
                    className={styles.input}
                    type="text"
                    id="empresa"
                    placeholder="Nombre Empresa"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.campo_formulario}>
                  <label htmlFor="imagen" className={styles.label}>Imagen</label>
                  <FileUploader
                    accept="imagen/*"
                    className={styles.input}
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={app.storage().ref("productos")} // lo mismo de la linea 84
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </div>
                <div className={styles.campo_formulario}>
                  <label htmlFor="url" className={styles.label}>URL</label>
                  <input 
                    className={styles.input}
                    type="url"
                    placeholder="URL de tu producto"
                    id="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className={styles.fieldset}>
                <legend>Sobre Tu Producto</legend>
                <div className={styles.campo_formulario}>
                  <label htmlFor="descripcion" className={styles.label}>Descripcion</label>
                  <textarea 
                    className={styles.textarea}
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>              
              <div className={styles.campo_formulario}>
                <input className={styles.btn1}
                  type="submit"
                  value="Crear Producto"
                />
              </div>
            </form>
          </div>
        </div>)}
      </Layout>
    </div>
  )
}