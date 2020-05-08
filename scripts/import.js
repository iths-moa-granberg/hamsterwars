const { db } = require('../api/firebase');
const hamsters = require('../api/data.json');

const jsonToFirestore = () => {
    try {
        hamsters.forEach(hamster => {
            db.collection('hamsters').doc(hamster.id.toString()).set(hamster);
            console.log('hamster added', hamster.id);
        });
    } catch (err) {
        console.error(err);
    }
}

jsonToFirestore();