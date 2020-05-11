const { Router } = require('express');
const router = new Router();
const { db } = require('../firebase');

// get all hamsters
router.get('/', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').get();
        const hamsters = [];
        snapshots.forEach(doc => {
            hamsters.push(doc.data());
        });
        res.send(hamsters);
    } catch (err) {
        res.status(500).send(err);
    }
});

//get random hamster
router.get('/random', async (req, res) => {
    try {
        const snapshots = await db.collection('hamsters').get();
        const hamsters = [];
        snapshots.forEach(doc => {
            hamsters.push(doc.data());
        });
        const randomHamster = hamsters[Math.floor(Math.random() * hamsters.length)];
        res.send(randomHamster);
    } catch (err) {
        res.status(500).send(err);
    }
});

// get hamster by id
router.get('/:id', async (req, res) => {
    try {
        const snapshot = await db.collection('hamsters').doc(req.params.id).get();
        res.send(snapshot.data());
    } catch (err) {
        res.status(500).send(err);
    }
});

// update hamster's wins && defeats by id
router.put('/:id/result', async (req, res) => {
    try {
        const snapshot = await db.collection('hamsters').doc(req.params.id).get();
        const hamster = snapshot.data();

        if (req.body.wins === 1 && req.body.defeats === 0) {
            hamster.wins++;
            hamster.games++;
        } else if (req.body.wins === 0 && req.body.defeats === 1) {
            hamster.defeats++;
            hamster.games++;
        } else {
            throw 'Error: Incorrect request';
        }

        db.collection('hamsters').doc(req.params.id).set(hamster)
            .then(res.send({ msg: `Hamster ${req.params.id} updated` }))
            .catch(err => { throw err });

    } catch (err) {
        res.status(500).send(err);
    }
});

// add new hamster
router.post('/', async (req, res) => {
    try {
        const hamster = req.body;
        const snapshot = await db.collection('hamsters').doc(hamster.id.toString()).get();

        if (snapshot.data()) {
            throw 'Error: ID already exists';
        }
        if (!checkKeys(hamster)) {
            throw 'Error: Incorrect keys';
        }

        db.collection('hamsters').doc(hamster.id.toString()).set(hamster)
            .then(res.send({ msg: `Hamster ${hamster.id} added` }))
            .catch(err => { throw err });

    } catch (err) {
        res.status(500).send(err);
    }
});

const checkKeys = obj => {
    return isNumber(obj['id'])
        && isNumber(obj['age'])
        && isNumber(obj['wins'])
        && isNumber(obj['defeats'])
        && isNumber(obj['games'])
        && isString(obj['name'])
        && isString(obj['imgName'])
        && isString(obj['favFood'])
        && isString(obj['loves']);
}

const isString = value => {
    return typeof value === 'string' || value instanceof String;
}

const isNumber = value => {
    return typeof value === 'number' && isFinite(value);
}

module.exports = router;