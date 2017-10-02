import express  = require('express');
import validate = require('express-validation');
import expressJwt = require('express-jwt');
import paramValidation from '../../../config/param-validation';
import carreraController from '../application/carrera.controller';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/carrera
 */
router.route('/')
  .get(carreraController.getAll)
  .post(carreraController.createNewCarrera);


export default router;
