import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getHamsterById } from '../../fetchFunctions';
import styles from './Hamster.module.scss';

const Hamster = () => {
  const params = useParams();
  const [hamster, setHamster] = useState(undefined);
  const [winPercentage, setWinPercentage] = useState(null);

  useEffect(() => {
    const getHamster = async () => {
      setHamster(await getHamsterById(params.id));
    };
    getHamster();
  }, [params]);

  useEffect(() => {
    if (hamster) {
      setWinPercentage((hamster.wins / hamster.games) * 100);
    }
  }, [hamster]);

  if (!hamster) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.root}>
      <h1>{hamster.name}</h1>
      <div>
        <img src={URL.createObjectURL(hamster.imgSrc)} alt="hamster" />
        <div>
          <p>{hamster.age} years old</p>
          <p>Favorite food: {hamster.favFood}</p>
          <p>Loves: {hamster.loves}</p>
          <p>Has won {winPercentage}% of its games</p>
          <p>Has participated in {hamster.games} games</p>
          <Link to="/battle/" className="primary-btn">
            Back to the battle!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamster;
