import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import BattleHamster from './BattleHamster';
import { getHamsterById, getTwoRandomHamsters, setGameResult } from '../fetchFunctions';

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
            history.push(`/matchup/${hamster.id}/${hamster2.id}/`);
        } else {
            await setGameResult(hamster, hamster1);
            history.push(`/matchup/${hamster.id}/${hamster1.id}/`);
        }
    }

    if (hamster1 === null || hamster2 === null) {
        return 'One of these hamsters does not exist';
    }

    if (!hamster1 || !hamster2) {
        return 'Loading';
    }

    if (hamster1.id === hamster2.id) {
        return 'Hamsters can not battle themselves';
    }

    return (
        <section className="wrapper">
            <div className="hamsters">
                <BattleHamster hamster={hamster1} handleClick={handleClick} />
                <BattleHamster hamster={hamster2} handleClick={handleClick} />
            </div>
            <p>Click on the cutest hamster!</p>
            <p>Can't decide? <span><Link to="/battle/">Click for new hamsters</Link></span></p>
        </section >
    );
}

export default Battle;
