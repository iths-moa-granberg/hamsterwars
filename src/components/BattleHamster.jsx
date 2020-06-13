import React from 'react';
import styles from './BattleHamster.module.scss';

const BattleHamster = ({ hamster, handleClick }) => {
    return (
        <div className={styles.root}>
            <h2>{hamster.name}</h2>
            <img src={hamster.imgUrl} alt="hamster" onClick={() => handleClick(hamster)} />
        </div>
    );
}

export default BattleHamster;
