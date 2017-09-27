import request from 'supertest';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';
import config from '../../../config/config';

describe('## Misc', () => {
  describe('# GET /', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/')
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res)
          done();
        })
        .catch(done);
    });
  });
});
