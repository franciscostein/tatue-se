const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('\x1b[32m', '\n* MongoDB 🍃 connected!!! *\n\n');
    } catch (err) {
        console.error('\x1b[31m', err.message);
        // exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
