const async = require('async');

const Section = require('../model/section');
const constant = require('../config/constant');

const mapItemToUri = (items) => {
  return items.map((item) => {
    return {uri: `homeworks/${item}`};
  });
};

class SectionController {
  getAll(req, res, next) {
    async.series({
      sections: (done) => {
        Section.find({}, (err, docs) => {
          if (err) {
            return next(err);
          }
          let sections = docs.map((doc) => {
            let section = doc.toJSON();
            section.homeworks = mapItemToUri(section.homeworks);
            return section;
          });
          done(null, sections);
        });
      },
      totalCount: (done) => {
        Section.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findById(sectionId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      let data = doc.toJSON();
      data.homeworks = mapItemToUri(data.homeworks);

      return res.status(constant.httpCode.OK).send(data);
    });
  }

  create(req, res, next) {
    Section.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `sections/${doc._id}`});
    });
  }

  update(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findByIdAndUpdate(sectionId, req.body, (err, doc) => {
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
    const sectionId = req.params.sectionId;
    Section.findByIdAndRemove(sectionId, (err, doc) => {
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

module.exports = SectionController;