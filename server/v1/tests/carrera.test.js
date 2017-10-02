import request from 'supertest';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';
import config from '../../../config/config';

describe('## Carrera Tests', () => {
  describe('# GET /api/carrera', () => {
    it('should return all carrera', (done) => {
      request(app)
        .get('/api/carrera')
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
