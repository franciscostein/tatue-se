const express = require('express');
const connectDB = require('./config/database/mongoDB');
const users = require('./routes/api/user');
// const apiErrorHandler = require('./utils/errors/apiErrorHandler');

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', users);
// app.use(apiErrorHandler);

app.listen(PORT, () => console.log(`\n- Server started on port ${PORT} -\n`));