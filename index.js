const express = require('express');
const app = express();

app.use(express.json());

// routes

app.listen(3000, () => console.log('server running at 3000'));