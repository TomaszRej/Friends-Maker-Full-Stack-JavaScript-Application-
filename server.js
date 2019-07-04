const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');


const app = express();

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/api/users', authRoutes);
app.use('/api/posts', postRoutes);

app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
});


const db = config.get('mongoURI');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB Connected...');
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"));
      })
    }
    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => console.log(`Server started on port ${port}`));
    const io = require('./socket').init(server);

    io.on('connection', socket => {
      console.log('Client connected');

    })

  })
  .catch(err => console.log(err));


