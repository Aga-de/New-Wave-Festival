const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonials = require('./routes/testimonials');
const concerts = require('./routes/concerts');
const seats = require('./routes/seats');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.yqkpa.mongodb.net/NewWaveDB`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000!');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

module.exports = server;
