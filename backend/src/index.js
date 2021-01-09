const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`\nServer initiated on port: ${port}\n`);
});