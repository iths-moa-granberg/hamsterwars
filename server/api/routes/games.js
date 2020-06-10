const { Router } = require('express');
const router = new Router();
const { db } = require('../firebase');

// get all games
router.get('/', async (req, res) => {
    try {
        const snapshots = await db.collection('games').get();
        const games = [];
        snapshots.forEach(doc => games.push(doc.data()));
        res.send(games);

    } catch (err) {
        res.status(500).send(err);
    }
});

// add new game 
router.post('/', async (req, res) => {
    try {
        const game = req.body;
        game.timestamp = new Date();
        game.id = new Date().getUTCMilliseconds();

        if (!checkKeys(game)) {
            throw 'Error: Incorrect keys';
        }

        await db.collection('games').doc(game.id.toString()).set(game);
        res.send({ msg: 'Game added' });

    } catch (err) {
        res.status(500).send(err);
    }
});

const checkKeys = obj => {
    return obj.contestants.length === 2
        && Boolean(obj.contestants.find(hamster => hamster.id === obj.winner.id));
}

module.exports = router;