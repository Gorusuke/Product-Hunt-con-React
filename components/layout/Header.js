import React, { Fragment, useContext } from 'react';
import Buscar from '../Ui/Buscar';
import Navegacion from './Navegacion';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { FirebaseContext } from '../../firebase';


const Header = () => {

    const {usuario, firebase } = useContext(FirebaseContext);

    return (
        <header className={styles.head}>
            <div className={styles.contenedor}>
                <div className={styles.modificar}>
                    <Link href="/"><p className={styles.logo}>P</p></Link>
                    <Buscar/>
                    <Navegacion/>
                </div>
                <div className={styles.modificar}>
                    {usuario
                    ? 
                        <Fragment> 
                            <p className={styles.parrafo}>Hola: {usuario.displayName}</p>
                            <a className={styles.boton} onClick={() => firebase.cerrarSesion()}>Cerrar Sesion</a>
                        </Fragment>
                    :   <Fragment> 
                            <Link href="/login"><a className={styles.boton}>Login</a></Link>
                            <Link href="/crear-cuenta"><a className={styles.boton1}>Crear Cuenta</a></Link>
                        </Fragment>
                    }
                    
                    
                </div>
            </div>
        </header>
    );
}
 
export default Header;