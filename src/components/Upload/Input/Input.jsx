import React from 'react';
import styles from './Input.module.scss';

const Input = ({ label, placeholder, handleOnChange, handleOnBlur, className, error }) => {
    return (
        <div className={styles.root}>
            <label htmlFor={label}>{label}</label>
            <input type="text" name={label} id={label} placeholder={placeholder}
                onChange={e => handleOnChange(e.target.value)}
                onBlur={() => handleOnBlur(true)}
                className={styles[className]}
            />
            <p className={'error'}>{error}</p>
        </div>
    );
}

export default Input;