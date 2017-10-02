import request from 'supertest';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';
import config from '../../../config/config';

describe('## Promocion Tests', () => {
  describe('# GET /api/promocion', () => {
    it('should return all promotions', (done) => {
      request(app)
        .get('/api/promocion')
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
  describe('# GET /api/query', () => {
    it('shold query promotions', (done) => {
      request(app)
        .get('/api/promocion/query')
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
