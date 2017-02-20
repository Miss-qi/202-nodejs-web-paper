const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperSchema = new Schema({
  paperName: String,
  sections: [{
    type: Schema.ObjectId,
    ref: 'Section'
  }]
});

const Paper = mongoose.model('Paper', paperSchema);
module.exports = Paper;