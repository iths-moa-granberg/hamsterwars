import React from 'react';

const MatchHamster = ({ hamster, win }) => {
    if (win) {
        return <h2>Winner is {hamster.name}!</h2>
    }
    return <h3>Loser is {hamster.name}</h3>
}

export default MatchHamster;