import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../../config/param-validation';
import productCtrl from '../application/product.controller';
import config from '../../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/promocion
 */
router.route('/')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);



export default router;
