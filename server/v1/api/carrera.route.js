import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../../config/param-validation';
import carreraController from '../application/carrera.controller';
import config from '../../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/carreras
 */
router.route('/')
  .get(carreraController.getAll)
  .post(carreraController.createNewCarrera);


export default router;
