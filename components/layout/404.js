import React, { Fragment } from 'react';
import styles from '../../styles/404.module.css';
import Link from 'next/link'


const Error404 = () => {

    return (
        <Fragment>
            <div className={styles.pagina_contenedor}>
                <h1>El Producto No Existe</h1>
                <p>La Pagina no fue encontrada</p>
                <section className={styles.error_container}>
                    <span><span>4</span></span>
                    <span>0</span>
                    <span><span>4</span></span>
                </section>
                <div className={styles.link_container}>
                    <Link href={'/'} >
                        <a className={styles.more_link}>Volver al Inicio</a>
                    </Link>
                </div>           
            </div>
        </Fragment>
    );
}
 
export default Error404;