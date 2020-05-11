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

module.exports = router;