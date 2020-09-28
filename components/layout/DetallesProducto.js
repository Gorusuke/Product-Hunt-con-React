import React from 'react';
import styles from '../../styles/index.module.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow/';
import {es} from 'date-fns/locale';
import Link from 'next/link'

const DetallesProducto = ({producto}) => {

    const {comentarios, creado, descripcion, id, nombre, urlImagen, votos} = producto;

    return (
        <li className={styles.producto}>
            <div className={styles.descripcion}>
                <div>
                    <img src={urlImagen} className={styles.img}/>
                </div>
                <div className={styles.titulo}>
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                        <a className={styles.a}>{nombre}</a>
                    </Link>
                    <p className={styles.parrafo}>{descripcion}</p>
                    <div className={styles.comentarios}>
                        <div>
                            <img/>
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </div>
                    <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale:es})}</p>
                </div>
            </div>
            <div className={styles.votos}>
                <div> &#9650; </div>
                <p>{votos}</p>
            </div>
        </li>
    );
}
 
export default DetallesProducto;