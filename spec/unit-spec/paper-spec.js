require('should');
const supertest = require('supertest');
const express = require('express');
const app = require('../../app');
const request = supertest(app);

const Paper = require('../../model/paper');

describe('PaperController', () => {
  it('GET /papers should return all papers', (done) => {
    request
        .get('/papers')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /papers/:paperId should return the paper', (done) => {
    request
        .get('/papers/58aaf9b799a1e75674df7e6a')
        .expect(200)
        .expect((res) => {
          res.body.should.eql({
            "_id": "58aaf9b799a1e75674df7e6a",
            "paperName": "test1",
            "__v": 0,
            "sections": [
              {
                "uri": "sections/58aa9523d20cf53090244b88"
              },
              {
                "uri": "sections/58aa968a3e73d03206921aee"
              }
            ]
          });
        })
        .end(done);
  });

  it('POST /papers should create one paper', (done) => {
    const paper = {
      paperName: "test",
      sections: [
        '58aa9523d20cf53090244b88'
      ]
    };

    request
        .post('/papers')
        .send(paper)
        .expect(201)
        .expect((res) => {
          Paper.findOne({paperName: "test"}, (err, doc) => {
            res.body.uri.should.equal(`papers/${doc._id}`);
          });
        })
        .end(done);
  });

  it('PUT /papers/:paperId should update the paper', (done) => {
    const paper = {
      paperName: 'qq'
    };
    request
        .put('/papers/58aaf9b799a1e75674df7e6a')
        .send(paper)
        .expect(204)
        .end(done);
  });

  it('DELETE /papers/:paperId should delete the paper', (done) => {
    request
        .delete('/papers/58aaf9b799a1e75674df7e6a')
        .expect(204)
        .end(done);
  });

});
