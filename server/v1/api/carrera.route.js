import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../../config/param-validation';
import carreraController from '../controllers/carrera.controller';
import config from '../../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/carreras
 */
router.route('/')
  .get(carreraController.getAll);

export default router;
