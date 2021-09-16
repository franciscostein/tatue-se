const express = require('express');
const connectDB = require('./config/database/mongoDB');
const cors = require('cors');
const users = require('./routes/user');
const auth = require('./routes/auth');
const artists = require('./routes/artist');
const clients = require('./routes/client');
const studios = require('./routes/studio');
const tattooStyles = require('./routes/tattooStyle');
const errorMiddleware = require('./middleware/error/error');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/artists', artists);
app.use('/api/clients', clients);
app.use('/api/studios', studios);
app.use('/api/tattoo-styles', tattooStyles);

app.use(errorMiddleware);

module.exports = app;