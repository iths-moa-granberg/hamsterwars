import React from 'react';
import styles from './MatchHamster.module.scss';

const MatchHamster = ({ hamster, win }) => {
    return (
        <div className={styles.root}>
            <h2 className={win ? styles.winner : styles.loser}>{win ? 'Winner!' : 'Loser!'}</h2>
            <img src={URL.createObjectURL(hamster.imgSrc)} alt="hamster" className={win ? styles['winner'] : styles['loser']}/>
        </div>
    );
}

export default MatchHamster;