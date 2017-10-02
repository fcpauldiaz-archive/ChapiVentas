import express  = require('express');
import validate = require('express-validation');
import expressJwt = require('express-jwt');

import paramValidation from '../../../config/param-validation';
import productCtrl from '../application/product.controller';


const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/promocion
 */
router.route('/')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);



export default router;
