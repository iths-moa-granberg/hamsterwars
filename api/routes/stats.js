const { Router } = require('express');
const router = new Router();
const { db } = require('../firebase');

// get numer of games
router.get('/total', async (req, res) => {
    try {
        const games = await db.collection('games').get();
        res.send({ totalGames: games.size });

    } catch (err) {
        res.status(500).send(err);
    }
});

// get precentage of previous games with same result
// url eg: /agree/?winnerId=41&loserId=11
router.get('/agree', async (req, res) => {
    try {
        const winnerId = parseInt(req.query.winnerId);
        const loserId = parseInt(req.query.loserId);
        let games = [];

        const snapshots = await db.collection('games')
            .where('winner.id', 'in', [winnerId, loserId])
            .get();
        snapshots.forEach(game => games.push(game.data()));

        games = games.filter(game =>
            !game.contestants.find(hamster =>
                hamster.id != winnerId && hamster.id != loserId)
        );

        const numOfWins = games.filter(game => game.winner.id === winnerId).length;

        res.send({ agreeancePercentage: Math.floor(numOfWins / games.length * 100) });

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;