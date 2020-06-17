import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MatchHamster from './MatchHamster/MatchHamster';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getAgreeance } from '../../fetchFunctions';
import styles from './Matchup.module.scss';

const Matchup = () => {
    const location = useLocation();
    const winner = location.state.winner;
    const loser = location.state.loser;
    const [agreeance, setAgreeance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setAgreeance(await getAgreeance({ winnerId: winner.id, loserId: loser.id }));
        }
        fetchData();
    }, [winner, loser]);

    if (!winner || !loser || !agreeance) {        
        return <LoadingSpinner />;
    }

    return (
        <section className={styles.root}>
            <div>
                <MatchHamster hamster={winner} win={true} />
                <MatchHamster hamster={loser} win={false} />
            </div>
            <p>{agreeance}% agrees that {winner.name} is cuter than {loser.name}</p>
            <Link to="/battle/" className="primary-btn">New game?</Link>
        </section>
    );
}

export default Matchup;