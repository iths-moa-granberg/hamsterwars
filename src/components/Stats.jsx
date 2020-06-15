import React, { useEffect, useState } from 'react';
import { getNumberOfGames, getTop5, getBottom5 } from '../fetchFunctions';
import StatsHamster from './StatsHamster';
import LoadingSpinner from './LoadingSpinner';
import styles from './Stats.module.scss';

const Stats = () => {
    const [top5, setTop5] = useState(undefined);
    const [bottom5, setBottom5] = useState(undefined);
    const [numOfGames, setNumOfGames] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setNumOfGames(await getNumberOfGames());
            setTop5(await getTop5());
            setBottom5(await getBottom5());
        }
        fetchData();
    }, []);

    if (!top5 || !bottom5) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.root}>
            <p>Total number of games played: {numOfGames}</p>
            <article>
                <h2>Top 5 hamsters</h2>
                <div>
                    {top5.map(hamster => <StatsHamster key={hamster.id} hamster={hamster} win={true} />)}
                </div>
            </article>
            <article>
                <h2>Bottom 5 hamsters</h2>
                <div>
                    {bottom5.map(hamster => <StatsHamster key={hamster.id} hamster={hamster} />)}
                </div>
            </article>
        </div>
    );
}

export default Stats;