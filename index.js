const express = require('express');
const app = express();
const port = 5001;

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.send('Login'));

app.listen(port, () => console.log(`on port ${port}`));
