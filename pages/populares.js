import styles from '../styles/index.module.css';
import React from 'react';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

export default function Populares() {

  const {productos} = useProductos('votos');

  return (
    <div>
      <Layout>
        <div className={styles.listado_producto}>
          <div className={styles.contenedor}>
            <ul className={styles.background}>
              {productos.map(producto => (
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