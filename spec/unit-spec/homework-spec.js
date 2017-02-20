require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../../app');
const request = supertest(app);

const Homework = require('../../model/homework');

describe('HomeworkController', () => {
  it('GET /homeworks should return all homeworks', (done) => {
    request
        .get('/homeworks')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /homeworks/:homeworkId should return one homework', (done) => {
    request
        .get('/homeworks/58aafe860aa4eb5f06ce151c')
        .expect(200)
        .expect((res) => {
          res.body.should.eql({
            "_id": "58aafe860aa4eb5f06ce151c",
            "homeworkName": "guessNumber",
            "__v": 0
          });
        })
        .end(done);
  });

  it('POST /homeworks should create a homework', (done) => {
    const homework = {
      "homeworkName": "guess"
    };
    request
        .post('/homeworks')
        .send(homework)
        .expect(201)
        .expect((res) => {
          Homework.findOne(homework, (err, doc) => {
            res.body.uri.should.equal(`homeworks/${doc._id}`);
          });
        })
        .end(done);
  });

  it('PUT /homeworks/:homeworkId should update the homework', (done) => {
    const homework = {
      'homeworkName': 'testUpdate'
    };
    request
        .put('/homeworks/58aafe860aa4eb5f06ce151c')
        .send(homework)
        .expect(204)
        .end(done);
  });

  it('DELETE /homeworks/:homeworkId should delete the homework', (done) => {
    request
        .delete('/homeworks/58aafe860aa4eb5f06ce151c')
        .expect(400)
        .end(done);
  });
});