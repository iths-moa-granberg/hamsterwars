import React, { useEffect, useState } from 'react';
import StatsHamster from './StatsHamster/StatsHamster';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getNumberOfGames, getTop5, getBottom5, getNumberOfHamsters } from '../../fetchFunctions';
import styles from './Stats.module.scss';

const Stats = () => {
  const [top5, setTop5] = useState(undefined);
  const [bottom5, setBottom5] = useState(undefined);
  const [numOfGames, setNumOfGames] = useState(0);
  const [numOfHamsters, setNumOfHamsters] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setNumOfGames(await getNumberOfGames());
      setNumOfHamsters(await getNumberOfHamsters());
      setTop5(await getTop5());
      setBottom5(await getBottom5());
    };
    fetchData();
  }, []);

  if (!top5 || !bottom5) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.root}>
      <p>
        Total number of games played: <span>{numOfGames}</span>
      </p>
      <p>
        Total number of hamsters: <span>{numOfHamsters}</span>
      </p>
      <article className={styles.hamsters}>
        <div>
          <h2>Top 5 hamsters</h2>
        </div>
        {top5.map((hamster) => (
          <StatsHamster key={hamster.id} hamster={hamster} win={true} />
        ))}
      </article>
      <article className={styles.hamsters}>
        <div>
          <h2>Bottom 5 hamsters</h2>
        </div>
        {bottom5.map((hamster) => (
          <StatsHamster key={hamster.id} hamster={hamster} />
        ))}
      </article>
    </div>
  );
};

export default Stats;
