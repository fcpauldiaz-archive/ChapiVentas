import request from 'supertest';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';
import config from '../../../config/config';

describe('## Venta Tests', () => {
  describe('# GET /api/ventas', () => {
    it('should return all ventas', (done) => {
      request(app)
        .get('/api/ventas')
        .expect(httpStatus.OK)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
