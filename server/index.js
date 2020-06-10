const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.static(__dirname + '/../build'));

// const auth = require('./api/auth');
// app.use(auth);

const assetsRoute = require('./api/routes/assets');
const hamstersRoute = require('./api/routes/hamsters');
const chartsRoute = require('./api/routes/charts');
const gamesRoute = require('./api/routes/games');
const statsRoute = require('./api/routes/stats');

app.use('/api/assets', assetsRoute);
app.use('/api/hamsters', hamstersRoute);
app.use('/api/charts', chartsRoute);
app.use('/api/games', gamesRoute);
app.use('/api/stats', statsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running at ${port}`));