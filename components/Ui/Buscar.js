import React, {useState} from 'react';
import styles from '../../styles/Home.module.css';
import Router from 'next/router';

const Buscar = () => {

    const [busqueda, setBusqueda] = useState('');

    const buscarProducto = (e) => {
        e.preventDefault();
        if(busqueda.trim() === '') return; // Cuando alguien intente buscar sin nada escrito el buscador no hara nada
        
        // Redireccionar al usuario a /buscar
        Router.push({
            pathname: '/buscar',
            query: { q : busqueda}
        })
    }

    return (
        <form 
            className={styles.formulario}
            onSubmit={buscarProducto}
        >
            <input 
                type="text"
                className={styles.inputText}
                placeholder="Buscar Productos"
                onChange={e => setBusqueda(e.target.value)}
            />
            <button type="submit" className={styles.inputBoton}>Buscar</button>
        </form>
    );
}
 
export default Buscar;