import express  = require('express');
import validate = require('express-validation');
import expressJwt = require('express-jwt');
import paramValidation from '../../../config/param-validation';
import ventaController from '../application/venta.controller';


const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/promocion
 */
router.route('/')
  .get(ventaController.getSales)
  .post(ventaController.addSale);

export default router;
