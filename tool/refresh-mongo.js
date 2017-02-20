const rawData = require('./fixture/raw-data');
const Homework = require('../model/homework');
const Section = require('../model/section');
const Paper = require('../model/paper');

const modelMap = {
  Homework,
  Section,
  Paper
};

let docs = Object.keys(rawData);

module.exports = function refresh(done) {
  Object.keys(rawData).forEach((v) => {
    modelMap[v].remove(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v);
        if (docs.length === 0) {
          done();
        }
      });
    });
  });
};

