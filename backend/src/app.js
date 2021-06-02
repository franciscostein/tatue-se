const express = require('express');
const connectDB = require('./config/database/mongoDB');
const users = require('./routes/user');
const auth = require('./routes/auth');
const artist = require('./routes/artist');
const tattooStyle = require('./routes/tattooStyle');
const errorMiddleware = require('./middleware/error/error');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/artists', artist);
app.use('/api/tattoo-styles', tattooStyle);

app.use(errorMiddleware);

module.exports = app;