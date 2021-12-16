const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`\n\n- 🚀 @ http://localhost/${PORT} -\n`));