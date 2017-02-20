const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  homeworkName: String
});

const Homework = mongoose.model('Homework', homeworkSchema);
module.exports = Homework;

