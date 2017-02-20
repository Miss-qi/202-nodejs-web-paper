const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  sectionName: String,
  homeworks: [{
    type: Schema.ObjectId,
    ref: 'homework'
  }]
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;