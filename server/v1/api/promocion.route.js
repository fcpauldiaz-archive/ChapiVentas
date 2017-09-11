import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../../config/param-validation';
import promocionController from '../application/promocion.controller';


const router = express.Router(); // eslint-disable-line new-cap

/**
 * GET /api/promocion
 */
router.route('/')
  .get(promocionController.getMesPromociones)
  .post(promocionController.createNewPromocion)

router.route('/delete')
  .post(promocionController.deletePromocion);

router.route('/query')
  .get(promocionController.getPromocionFecha);

export default router;
