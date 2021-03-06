const mongoose = require('mongoose');
const refreshMongo = require('./refresh-mongo');

mongoose.connect('mongodb://localhost/exam', (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
  }
});

refreshMongo(() => {
  process.exit(0);
});