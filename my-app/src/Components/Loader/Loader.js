import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function HashLoader() {
  return (
    <Loader
      className={styles.spinner}
      type="Circles"
      color="orange"
      height={250}
      width={250}
      timeout={3000}
    />
  );
}
