import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAgreeance } from '../fetchFunctions';
import MatchHamster from './MatchHamster';

const Matchup = () => {
    const location = useLocation();
    const winner = location.state.winner;
    const loser = location.state.loser;
    const [agreeance, setAgreeance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setAgreeance(await getAgreeance({ winnerId: winner.id, loserId: loser.id }));
        }
        fetchData();
    }, [winner, loser]);

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