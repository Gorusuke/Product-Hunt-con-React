import React, {useEffect, useContext, useState, Fragment} from 'react';
import {useRouter} from 'next/router';
import Layout from '../../components/layout/Layout';
import styles from '../../styles/id.module.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow/';
import {es} from 'date-fns/locale';

import {FirebaseContext} from '../../firebase';
import Error404 from '../../components/layout/404';

const Producto = () => {

    const [producto, setProducto] = useState([]);
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    // Routing para tener el id actual
    const router = useRouter();
    const {query: {id}} = router;

    // Context de firebase
    const {firebase, usuario} = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const product = await productoQuery.get();
                if(product.exists){
                    setProducto(product.data());
                    setConsultarDB(false);
                } else {
                    setError(true);
                    setConsultarDB(false);
                }
            };
            obtenerProducto();
        }
    }, [id/*, producto*/]); // quitamos producto y agregamos el state de consultarDB
    
    if(Object.keys(producto).length === 0 && !error) return <p className={styles.cargando}>Cargando...</p>
   
    const {comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, creador, haVotado} = producto;

    // funcion para los votos
    const votosProducto = () => {
        if(!usuario){
            return router.push('/login');
        }
        // Obtener y sumar ujn nuevi voto
        const totalVotos = votos + 1;

        // Verificar si el usuario ha votado
        if(haVotado.includes(usuario.uid)) return;

        // Guardar el ID del usuario que ha votado
        const yavoto = [...haVotado, usuario.uid]

        // Actualizar en la DB
        firebase.db.collection('productos').doc(id).update({
            votos: totalVotos, 
            haVotado: yavoto
        })

        // Actualizar en el State
        setProducto({
            ...producto,
            votos: totalVotos
        })
        setConsultarDB(true) // hay un voto por lo tanto consultar la base de datos(useEffect)
    }

    // Funcion para crear comentarios
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id === id){
            return true;
        }
    }

    // Agregando el comentario
    const agregarComentario = (e) => {
        e.preventDefault();
        if(!usuario){
            return router.push('/login');
        } // por si acaso

        // Informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentario y agregarlo al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la DB
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        setConsultarDB(true) // lo mismo que la linea 71
       
        // Poner el formulario en blanco

    }

    // Funcion que revisa que el creador del producto elimine el proyecto
    const eliminar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid){
            return true;
        }
    }

    // Elimina el producto de la base de datos
    const eliminarProducto = () => {
        if(!usuario){
            return router.push('/login');
        }
        if(creador.id !== usuario.uid){
            return router.push('/');
        }
        try {
           firebase.db.collection('productos').doc(id).delete();
           router.push('/');            
        } catch (error) {
            console.info(error);
        }
    }

    return (
        <Layout>
            <Fragment>
                {error ? <Error404/> 
                :(
                <div className={styles.contenedor}>
                    <h1>{nombre}</h1>
                    <div className={styles.contenido}>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale:es})}</p>
                            <p>Por: {creador.nombre} de {empresa}</p>
                            <img src={urlImagen} className={styles.img}/>
                            <p className={styles.votos}>{descripcion}</p>

                            {usuario && (<Fragment>
                                <h2 className={styles.votos}>Agrega tu comentario</h2>
                                <form
                                    onSubmit={agregarComentario}
                                >
                                    <input
                                        type="text"
                                        name="mensaje"
                                        className={styles.input}
                                        onChange={comentarioChange}

                                    />
                                    <input 
                                        type="submit"
                                        value="Agregar Comentario"
                                        className={styles.btn1}
                                    />
                                </form>
                            </Fragment>)}
                            <h2 className={styles.votos}>Comentarios</h2>
                            {comentarios.length === 0 ? <p>Aun no hay comentarios</p> : (
                                <ul>
                                    {comentarios.map((comentario, i) => ( // la (i) es el key (<---- asi es una forma)
                                        <li
                                            key={`${comentario.usuarioId}-${i}`}
                                            className={styles.li}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Comentado por: <span className={styles.span}>{comentario.usuarioNombre}</span></p>
                                            {esCreador(comentario.usuarioId) && <p className={styles.creador}>
                                                Es Creador</p>}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <aside>
                            <a 
                                target="_blank"
                                href={url}
                                className={styles.btn2}
                            >Visitar Url</a>
                            <div className={styles.votos}>
                                <p>{votos} Votos</p>
                                {usuario && <a className={styles.btn3} onClick={votosProducto}>Votar</a>}
                            </div>
                        </aside>
                    </div>
                    {eliminar() && <a onClick={eliminarProducto} className={styles.btn3}>Eliminar Producto</a>}
                </div>)}
            </Fragment>
        </Layout>
    );
}
 
export default Producto;