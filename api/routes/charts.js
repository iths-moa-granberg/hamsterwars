const { Router } = require('express');
const { db } = require('../firebase');
const router = new Router();

// get 5 hamsters with most wins
router.get('/top', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').get();
        const hamsters = [];

        snapshots.forEach(doc => {
            hamsters.push(doc.data());
        });

        hamsters.sort((a, b) => (a.wins < b.wins) ? 1 : -1);
        const top = Object.values(hamsters).slice(0, 5); 
        

        res.send(top);
    } catch (err) {
        res.status(500).send(err);
    }
});

// get 5 hamsters with most defeats
router.get('/bottom', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').get();
        const hamsters = [];

        snapshots.forEach(doc => {
            hamsters.push(doc.data());
        });

        hamsters.sort((a, b) => (a.defeats < b.defeats) ? 1 : -1);
        const bottom = Object.values(hamsters).slice(0, 5);

        res.send(bottom);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;