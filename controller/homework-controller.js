const async = require('async');

const Homework = require('../model/homework');
const Section = require('../model/section');
const constant = require('../config/constant');

class HomeworkController {
  getAll(req, res, next) {
    async.series({
      homeworks: (done) => {
        Homework.find({}, done);
      },
      totalCount: (done) => {
        Homework.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findById(homeworkId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    Homework.create(req.body, (err, doc) => {
      console.log(req.body)
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `homeworks/${doc._id}`});
    });
  }

  update(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findByIdAndUpdate(homeworkId, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  delete(req, res, next) {

    const homeworkId = req.params.homeworkId;
    async.waterfall([
      (done) => {
        Section.findOne({homeworks: homeworkId}, done)
      },
      (doc, done) => {
        if (doc) {
          done(true, null);
        } else {
          Homework.findByIdAndRemove(homeworkId, (err, docs) => {
            if (!docs) {
              done(false, null);
            }
            done(err, doc);
          });
        }
      }
    ], (err) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
module.exports = HomeworkController;
