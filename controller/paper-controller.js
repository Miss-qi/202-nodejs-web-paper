const async = require('async');

const Paper = require('../model/paper');
const constant = require('../config/constant');

const mapSectionToUri = (sections) => {
  return sections.map((section) => {
    return {uri: `sections/${section}`};
  });
};

class PaperController {
  getAll(req, res, next) {
    async.series({
      papers: (done) => {
        Paper.find({}, (err, docs) => {
          if (err) {
            return next(err);
          }
          let papers = docs.map((doc) => {
            let paper = doc.toJSON();
            paper.sections = mapSectionToUri(doc.sections);
            return paper;
          });
          done(null, papers);
        });
      },
      totalCount: (done) => {
        Paper.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const paperId = req.params.paperId;

    Paper.findById(paperId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      let data = doc.toJSON();
      data.sections = mapSectionToUri(doc.sections);
      return res.status(constant.httpCode.OK).send(data);
    });
  }

  create(req, res, next) {
    Paper.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `papers/${doc._id}`});
    });
  }

  update(req, res, next) {
    const paperId = req.params.paperId;
    Paper.findByIdAndUpdate(paperId, req.body, (err, doc) => {
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
    const paperId = req.params.paperId;
    Paper.findByIdAndRemove(paperId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = PaperController;