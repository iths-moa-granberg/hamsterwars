import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './StatsHamster.module.scss';

const StatsHamster = ({ hamster, win }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/hamster/${hamster.id}/`);
  };

  return (
    <div className={styles.hamster}>
      <img src={URL.createObjectURL(hamster.imgSrc)} alt={hamster.name} onClick={handleClick} />
      <h3>{hamster.name}</h3>
      {win ? <p>Has won {hamster.wins} matches.</p> : <p>Has lost {hamster.defeats} matches.</p>}
    </div>
  );
};

export default StatsHamster;
