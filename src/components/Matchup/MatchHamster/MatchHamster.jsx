import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MatchHamster.module.scss';

const MatchHamster = ({ hamster, win }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/hamster/${hamster.id}/`);
  };

  return (
    <div className={styles.root}>
      <h2 className={win ? styles.winner : styles.loser}>{win ? 'Winner!' : 'Loser!'}</h2>
      <img
        src={URL.createObjectURL(hamster.imgSrc)}
        alt="hamster"
        className={win ? styles['winner'] : styles['loser']}
        onClick={handleClick}
      />
    </div>
  );
};

export default MatchHamster;
