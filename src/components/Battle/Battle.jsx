import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import BattleHamster from './BattleHamster/BattleHamster';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getHamsterById, getTwoRandomHamsters, setGameResult } from '../../fetchFunctions';
import styles from './Battle.module.scss';

const Battle = () => {
    const params = useParams();
    const history = useHistory();
    const [hamster1, setHamster1] = useState(undefined);
    const [hamster2, setHamster2] = useState(undefined);

    useEffect(() => {
        const getHamsters = async () => {
            if (params.id1 && params.id2) {
                setHamster1(await getHamsterById(params.id1));
                setHamster2(await getHamsterById(params.id2));
            } else {
                const hamsters = await getTwoRandomHamsters();
                setHamster1(hamsters[0]);
                setHamster2(hamsters[1]);
            }
        }
        getHamsters();
    }, [params]);

    const handleClick = async (hamster) => {
        if (hamster.id === hamster1.id) {
            await setGameResult(hamster, hamster2);
            history.push({
                pathname: `/matchup/${hamster.id}/${hamster2.id}/`,
                state: { winner: hamster, loser: hamster2 },
            });
        } else {
            await setGameResult(hamster, hamster1);
            history.push({
                pathname: `/matchup/${hamster.id}/${hamster1.id}/`,
                state: { winner: hamster, loser: hamster1 },
            });
        }
    }

    if (hamster1 === null || hamster2 === null) {
        return 'One of these hamsters does not exist';
    }

    if (!hamster1 || !hamster2) {
        return <LoadingSpinner />;
    }

    if (hamster1.id === hamster2.id) {
        return 'Hamsters can not battle themselves';
    }

    return (
        <section className={styles.root}>
            <h1>Click on the cutest hamster!</h1>
            <div>
                <BattleHamster hamster={hamster1} handleClick={handleClick} />
                <BattleHamster hamster={hamster2} handleClick={handleClick} />
            </div>
            <p>Can't decide?</p>
            <Link to="/battle/" className="primary-btn">Click for new hamsters</Link>
        </section >
    );
}

export default Battle;
