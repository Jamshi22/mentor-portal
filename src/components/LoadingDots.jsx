import React from 'react';
import styles from '../styles/LoadingDots.module.css'

const LoadingDots = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default LoadingDots;
