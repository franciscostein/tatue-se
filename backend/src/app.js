const express = require('express');
const cors = require('cors');
require('./utils/db/mongoose');
const userRouter = require('./routes/user');
const artistRouter = require('./routes/artist');

const app = express();

app.use(cors());    // enable all CORS requests
app.use(express.json()); // accept and convert json to object
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(artistRouter);

module.exports = app;