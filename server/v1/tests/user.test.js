import request from 'supertest';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import app from '../../../index';
import config from '../../../config/config';


describe('## User APIs', () => {

  let validUserCredentials = {
    username: 'test',
    password: '1234'
  };

  let invalidUserCredentials = {
    username: 'react',
    password: 'IDontKnow'
  };

  describe('# POST /api/users', () => {
    it('should create user', (done) => {
      request(app)
        .post('/api/users')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.ops[0].username).to.equal(validUserCredentials.username);
          validUserCredentials = res.body.ops[0];
          done();
        })
        .catch(done);
    });

    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/user/:username', () => {
    it('should find user by username', (done) => {
      request(app)
        .get(`/api/users/${validUserCredentials.username}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.include(validUserCredentials);
          done();
        })
        .catch(done);
    });
  });
  describe('# POST /api/users/delete/:userId', () => {
    it('Should delete user', (done) => {
      request(app)
        .get(`/api/users/delete/${validUserCredentials._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
