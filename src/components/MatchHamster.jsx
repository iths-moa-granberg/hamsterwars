import React from 'react';
import styles from './MatchHamster.module.scss';

const MatchHamster = ({ hamster, win }) => {
    return (
        <div className={styles.root}>
            {win
                ? <h2>Winner is {hamster.name}</h2>
                : <h3>Loser is {hamster.name}</h3>
            }
            <img src={URL.createObjectURL(hamster.imgSrc)} alt="hamster" className={win ? styles['winner'] : styles['loser']}/>
        </div>
    );
}

export default MatchHamster;