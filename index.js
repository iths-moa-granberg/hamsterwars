const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const assetsRoute = require('./routes/assets');
const hamstersRoute = require('./routes/hamsters');
const chartsRoute = require('./routes/charts');
const gamesRoute = require('./routes/games');
const statsRoute = require('./routes/stats');

app.use('/assets', assetsRoute);
app.use('/hamsters', hamstersRoute);
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/stats', statsRoute);

app.listen(3000, () => console.log('server running at 3000'));