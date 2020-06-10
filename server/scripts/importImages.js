const { bucket } = require('../api/firebase');

const imageToFirebaseStorage = async () => {
    try {
        for (let i = 1; i <= 40; i++) {
            await bucket.upload(`../hamsters/hamster-${i}.jpg`, { destination: `hamsters/hamster-${i}.jpg` });
            console.log(`hamsterpic id ${i} added`);
        }
    } catch (err) {
        console.error(err);
    }
}

imageToFirebaseStorage();