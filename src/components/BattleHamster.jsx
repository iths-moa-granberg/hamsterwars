import React, { useState, useEffect } from 'react';
import { getImage } from '../fetchFunctions';
import styles from './BattleHamster.module.scss';

const BattleHamster = ({ hamster, handleClick }) => {
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (hamster) {
            const updateImage = async () => {
                setImg(await getImage(hamster));
            }
            updateImage();
        }
    }, [hamster]);

    return (
        <div className={styles.root}>
            {hamster && <h2>{hamster.name}</h2>}
            {img && <img src={img} alt="hamster" onClick={() => handleClick(hamster)} />}
        </div>
    );
}

export default BattleHamster;
