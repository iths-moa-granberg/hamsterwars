const { Router } = require('express');
const { db } = require('../firebase');
const router = new Router();

// get 5 hamsters with most wins
router.get('/top', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
        const hamsters = [];
        snapshots.forEach(doc => hamsters.push(doc.data()));

        res.send(hamsters);
    } catch (err) {
        res.status(500).send(err);
    }
});

// get 5 hamsters with most defeats
router.get('/bottom', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get();
        const hamsters = [];
        snapshots.forEach(doc => hamsters.push(doc.data()));

        res.send(hamsters);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;