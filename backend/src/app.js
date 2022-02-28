const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database/mongoDB');
const users = require('./routes/user');
const auth = require('./routes/auth');
const artists = require('./routes/artist');
const studios = require('./routes/studio');
const tattooStyles = require('./routes/tattooStyle');
const errorMiddleware = require('./middleware/error/error');

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: '25mb' }));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/artists', artists);
app.use('/api/studios', studios);
app.use('/api/tattoo-styles', tattooStyles);

app.use(errorMiddleware);

// serves static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

module.exports = app;
