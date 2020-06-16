import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Start.module.scss';

const Start = () => {
    return (
        <div className={styles.root}>
            <h1>Hamsterwars</h1>
            <h4>This is a website where hamsters battle for fun</h4>
            <Link to="/battle/" className={'primary-btn'}>Start the battle!</Link>
        </div>
    );
}

export default Start;