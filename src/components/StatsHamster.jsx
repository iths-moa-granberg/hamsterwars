import React from 'react';
import styles from './StatsHamster.module.scss';

const StatsHamster = ({ hamster, win }) => {
    return (
        <div className={styles.hamster}>
            <img src={URL.createObjectURL(hamster.imgSrc)} alt={hamster.name} />
            <h3>{hamster.name}</h3>
            {win
                ? <p>Has won {hamster.wins} matches.</p>
                : <p>Has lost {hamster.defeats} matches.</p>}
        </div>
    );
}

export default StatsHamster;