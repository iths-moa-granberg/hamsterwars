const admin = require("firebase-admin");
const serviceAccount = JSON.parse(Buffer.from(process.env.SERVICEACCOUNT, 'base64').toString('ascii'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hamsterwars-4ea5d.firebaseio.com",
    storageBucket: "hamsterwars-4ea5d.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };