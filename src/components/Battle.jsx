import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BattleHamster from './BattleHamster';
import { getHamsterById, getTwoRandomHamsters } from '../fetchFunctions';

const Battle = () => {
    const params = useParams();
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);

    useEffect(() => {
        (async () => {
            if (params.id1 && params.id2) {
                if (params.id1 === params.id2) {
                    console.log('hamsters can not battle themselves');
                } else {
                    setHamster1(await getHamsterById(params.id1));
                    setHamster2(await getHamsterById(params.id2));
                }
            } else {
                const hamsters = await getTwoRandomHamsters();
                setHamster1(hamsters[0]);
                setHamster2(hamsters[1]);
            }
        })();
    }, [params]);

    const handleClick = (hamster) => {
        console.log('you clikced on', hamster.name);
    }

    return (
        <section className="wrapper">
            <div className="hamsters">
                <BattleHamster hamster={hamster1} handleClick={handleClick} />
                <BattleHamster hamster={hamster2} handleClick={handleClick} />
            </div>
            <p>Click on the cutest hamster!</p>
            <p>Can't decide? <span><Link to="/battle">Click for new hamsters</Link></span></p>
        </section >
    );
}

export default Battle;
