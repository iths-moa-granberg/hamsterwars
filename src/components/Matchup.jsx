import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHamsterById, getAgreeance } from '../fetchFunctions';
import MatchHamster from './MatchHamster';

const Matchup = () => {
    const params = useParams();
    const [winner, setWinner] = useState(null);
    const [loser, setLoser] = useState(null);
    const [agreeance, setAgreeance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setWinner(await getHamsterById(params.id1));
            setLoser(await getHamsterById(params.id2));
            setAgreeance(await getAgreeance(params.id1, params.id2));
        }
        fetchData();
    }, [params]);

    if (!winner || !loser || !agreeance) {
        return 'loading';
    }

    return (
        <section className="wrapper">
            <div>
                <MatchHamster hamster={winner} win={true} />
                <MatchHamster hamster={loser} win={false} />
            </div>
            <p>{agreeance}% agrees that {winner.name} is cuter than {loser.name}</p>
            <Link to="/battle/">New game?</Link>
        </section>
    );
}

export default Matchup;