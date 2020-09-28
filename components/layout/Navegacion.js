import React, {useContext} from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import {FirebaseContext} from '../../firebase';



const Navegacion = () => {

    // Context con las operaciones crud de firebase(funcionalidades para crear los productos)
  const {usuario} = useContext(FirebaseContext); //esto es el return que esta en el _app que equivale a context de firebase


    return (


        <nav className={styles.navegacion}>
            <Link href="/"><a className={styles.enlaces}>Inicio</a></Link>
            <Link href="/populares"><a className={styles.enlaces}>Populares</a></Link>
            {usuario ? <Link href="/nuevo-producto"><a className={styles.enlaces}>Nuevo Producto</a></Link> : null}
        </nav>
    )
}
 
export default Navegacion;