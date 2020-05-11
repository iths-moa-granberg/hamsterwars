const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const auth = require('./api/auth');
app.use(auth);

const assetsRoute = require('./api/routes/assets');
const hamstersRoute = require('./api/routes/hamsters');
const chartsRoute = require('./api/routes/charts');
const gamesRoute = require('./api/routes/games');
const statsRoute = require('./api/routes/stats');

app.use('/assets', assetsRoute);
app.use('/hamsters', hamstersRoute);
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/stats', statsRoute);

app.listen(3000, () => console.log('server running at 3000'));