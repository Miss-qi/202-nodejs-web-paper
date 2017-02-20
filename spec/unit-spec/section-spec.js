require('should');
const supertest = require('supertest');
const express = require('express');
const app = require('../../app');
const request = supertest(app);

const Section = require('../../model/section');

describe('SectionController', () => {
  it('GET /sections should return all sections', (done) => {
    request
        .get('/sections')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /sections/:sectionId should return the section', (done) => {
    request
        .get('/sections/58aa9523d20cf53090244b88')
        .expect(200)
        .expect((res) => {
          res.body.should.eql({
            _id: "58aa9523d20cf53090244b88",
            sectionName: "java",
            __v: 0,
            homeworks: [
              {
                uri: "homeworks/58aafe860aa4eb5f06ce151c"
              },
              {
                uri: "homeworks/58aafe980aa4eb5f06ce151d"
              }
            ]
          });
        })
        .end(done);
  });

  it('POST /sections should create a section', (done) => {
    const section = {
      sectionName: "ruby",
      homeworks: [
        '58aafe980aa4eb5f06ce151d'
      ]
    };
    request
        .post('/sections')
        .send(section)
        .expect(201)
        .expect((res) => {
          Section.findOne({sectionName: 'ruby'}, (err, doc) => {
            res.body.uri.should.equal(`sections/${doc._id}`);
          });
        })
        .end(done);
  });

  it('PUT /sections/:sectionId should update the section', (done) => {
    const section = {
      sectionName: "ruby",
      homeworks: [
        '58aafe980aa4eb5f06ce151d'
      ]
    };
    request
        .put('/sections/58aa968a3e73d03206921aee')
        .send(section)
        .expect(204)
        .end(done);
  });

  it('DELETE /sections/:sectionId should delete the section', (done) => {
    request
        .delete('/sections/58aa968a3e73d03206921aee')
        .expect(204)
        .end(done);
  });
});