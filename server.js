const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use('/api/users', userRoutes);


// app.use('/', (req, res, next) => {
//   res.send('<h1>Hello</h1>')
// })


const port =  8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
