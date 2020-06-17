import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.root}>
      <span role="img" aria-label="hamster" className={styles.spinning}>
        🐹
      </span>
    </div>
  );
};

export default LoadingSpinner;
