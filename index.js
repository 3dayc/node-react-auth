const express = require('express');
const app = express();
const port = 5016;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://hyanghoon:${process.env.REACT_APP_MONGODB_PW}@cluster0.vdejef3.mongodb.net/?retryWrites=true&w=majority`
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.send('Login'));

app.listen(port, () => console.log(`on port ${port}`));
