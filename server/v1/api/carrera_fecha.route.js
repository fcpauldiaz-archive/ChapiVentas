import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../../config/param-validation';
import carreraFechaCtrl from '../application/carrera_fecha.controller';


const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/carrera/fecha
 */
router.route('/')
  .get(carreraFechaCtrl.getCarreraFecha)
  .post(carreraFechaCtrl.createCarreraFecha);
router.route('/mes').post(carreraFechaCtrl.getCarreraFechaMes);


export default router;
