import Layout from '../components/layout/Layout';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';
import styles from '../styles/index.module.css';


export default function buscar() {

  const router = useRouter();
  const {query: {q}} = router;
  
  // Todos los productos
  const {productos} = useProductos('creado');
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto =>{
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setResultado(filtro)

  }, [q, productos])

  return (
    <div >
      <Layout>
        <div className={styles.listado_producto}>
          <div className={styles.contenedor}>
            <ul className={styles.background}>
              {resultado.map(producto => (
                <DetallesProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}